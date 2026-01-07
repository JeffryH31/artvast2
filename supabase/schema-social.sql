-- Social Features Schema: Follows & Messages
-- Run this in your Supabase SQL Editor after other schemas

-- =============================================
-- FOLLOWS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  UNIQUE(follower_id, following_id)
);

-- =============================================
-- CONVERSATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  unread_count_user INTEGER DEFAULT 0,
  unread_count_designer INTEGER DEFAULT 0,
  UNIQUE(user_id, designer_id)
);

-- =============================================
-- MESSAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('user', 'designer')),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_designer_id ON conversations(designer_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Follows: Anyone can see follows, users can manage their own
CREATE POLICY "Anyone can view follows" ON follows
  FOR SELECT USING (true);

CREATE POLICY "Users can follow" ON follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow" ON follows
  FOR DELETE USING (auth.uid() = follower_id);

-- Conversations: Users can only see their own conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT user_id FROM designers WHERE id = designer_id)
  );

CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Participants can update conversations" ON conversations
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT user_id FROM designers WHERE id = designer_id)
  );

-- Messages: Participants can see and send messages
CREATE POLICY "Conversation participants can view messages" ON messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE 
        user_id = auth.uid() OR 
        designer_id IN (SELECT id FROM designers WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Conversation participants can send messages" ON messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    conversation_id IN (
      SELECT id FROM conversations WHERE 
        user_id = auth.uid() OR 
        designer_id IN (SELECT id FROM designers WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Message recipients can mark as read" ON messages
  FOR UPDATE USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE 
        user_id = auth.uid() OR 
        designer_id IN (SELECT id FROM designers WHERE user_id = auth.uid())
    )
  );

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger to update conversation when a new message is sent
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    last_message = NEW.content,
    last_message_at = NEW.created_at,
    updated_at = NOW(),
    unread_count_user = CASE 
      WHEN NEW.sender_type = 'designer' THEN unread_count_user + 1 
      ELSE unread_count_user 
    END,
    unread_count_designer = CASE 
      WHEN NEW.sender_type = 'user' THEN unread_count_designer + 1 
      ELSE unread_count_designer 
    END
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_message_sent ON messages;
CREATE TRIGGER on_message_sent
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_on_message();

-- Trigger to update designer followers_count on follow/unfollow
CREATE OR REPLACE FUNCTION update_designer_followers_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE designers SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE designers SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = OLD.following_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_follow_change ON follows;
CREATE TRIGGER on_follow_change
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_designer_followers_count();

-- Trigger for conversations updated_at
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
