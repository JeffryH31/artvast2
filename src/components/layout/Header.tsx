"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon } from "../ui/Icons";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useRole } from "@/hooks/useRole";
import AuthModal from "../auth/AuthModal";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const pathname = usePathname();

  const { user, loading, signOut } = useAuth();
  const { role, isDesigner, isAdmin } = useRole();
  const { totalItems } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/85 dark:bg-gray-900/95 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] translate-y-0"
            : "bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl"
        }`}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6]/5 via-[#8B5A8C]/5 to-[#BD9587]/5 pointer-events-none"></div>

        {/* Top accent line - animated gradient */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5D6BC6] via-[#8B5A8C] to-[#BD9587] transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Subtle inner glow */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/50 dark:from-gray-800/30 to-transparent pointer-events-none"></div>

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-500 ${
              scrolled ? "h-14 sm:h-16 lg:h-18" : "h-16 sm:h-18 lg:h-20"
            }`}
          >
            {/* Logo Section - Enhanced */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group cursor-pointer"
              >
                <div className="relative">
                  {/* Logo glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
                  {/* Logo Image */}
                  <Image
                    src="/Artvast Logo.png"
                    alt="Artvast Logo"
                    width={48}
                    height={48}
                    className="relative w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 object-contain group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <Image
                    src="/Artvast Logo Text.png"
                    alt="Artvast"
                    width={130}
                    height={24}
                    className="h-[13px] sm:h-[13px] lg:h-[13px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <span className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-medium hidden sm:block tracking-wider uppercase">
                    Creative Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Premium */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/5">
                {/* Navigation Links with Pill Effect */}
                <Link
                  href="/"
                  className={`relative px-5 py-2 rounded-xl overflow-hidden group transition-all duration-300 ${
                    isActive("/")
                      ? "text-white font-semibold"
                      : "text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {/* Active background pill */}
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-[#5D6BC6] to-[#8B5A8C] rounded-xl transition-all duration-300 ${
                      isActive("/")
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  ></span>
                  {/* Hover effect */}
                  <span
                    className={`absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-xl transition-all duration-300 ${
                      isActive("/")
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <svg
                      className={`w-4 h-4 transition-colors ${
                        isActive("/")
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>{t.nav.home}</span>
                  </span>
                </Link>

                <Link
                  href="/portfolio"
                  className={`relative px-5 py-2 rounded-xl overflow-hidden group transition-all duration-300 ${
                    isActive("/portfolio")
                      ? "text-white font-semibold"
                      : "text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-[#8B5A8C] to-[#BD9587] rounded-xl transition-all duration-300 ${
                      isActive("/portfolio")
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  ></span>
                  <span
                    className={`absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-xl transition-all duration-300 ${
                      isActive("/portfolio")
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <svg
                      className={`w-4 h-4 transition-colors ${
                        isActive("/portfolio")
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{t.nav.portfolio}</span>
                  </span>
                </Link>

                {/* Marketplace link hidden for now
                <Link
                  href="/marketplace"
                  className={`relative px-5 py-2 rounded-xl overflow-hidden group transition-all duration-300 ${
                    isActive("/marketplace")
                      ? "text-white font-semibold"
                      : "text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-[#BD9587] to-[#A2655F] rounded-xl transition-all duration-300 ${
                      isActive("/marketplace")
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  ></span>
                  <span
                    className={`absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-xl transition-all duration-300 ${
                      isActive("/marketplace")
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <svg
                      className={`w-4 h-4 transition-colors ${
                        isActive("/marketplace")
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span>{t.nav.marketplace}</span>
                  </span>
                </Link>
                */}

                {/* Designer Menu hidden - transaction features disabled
                {isDesigner && (
                  <Link
                    href="/designer/products"
                    className={`relative px-5 py-2 rounded-xl overflow-hidden group transition-all duration-300 ${
                      pathname?.startsWith("/designer")
                        ? "text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-[#5D6BC6] to-[#1647A3] rounded-xl transition-all duration-300 ${
                        pathname?.startsWith("/designer")
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-xl transition-all duration-300 ${
                        pathname?.startsWith("/designer")
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></span>
                    <span className="relative z-10 flex items-center space-x-1.5">
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          pathname?.startsWith("/designer")
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span>{t.nav.myProducts}</span>
                    </span>
                  </Link>
                )}
                */}
              </div>

              {/* Settings Toggles */}
              <div className="flex items-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl p-1 border border-white/20 dark:border-gray-700/30">
                <LanguageToggle />
                <div className="w-px h-5 bg-gray-300/50 dark:bg-gray-600/50 mx-0.5"></div>
                <ThemeToggle />
              </div>

              {/* Auth Section */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              ) : user ? (
                /* Logged in user */
                <div className="flex items-center space-x-2">
                  {/* Cart Icon hidden - transaction features disabled
                  {!isDesigner && (
                    <Link
                      href="/cart"
                      className="relative p-2.5 bg-white/40 dark:bg-gray-800/40 hover:bg-white/70 dark:hover:bg-gray-700/70 backdrop-blur-md rounded-xl transition-all duration-300 group border border-white/20 dark:border-gray-700/30 hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-[#5D6BC6] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}
                  */}

                  {/* User Menu */}
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5D6BC6] to-[#8B5A8C] flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-110 transition-transform">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium max-w-[100px] truncate">
                      {user.email?.split("@")[0]}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="relative p-2.5 text-gray-500 dark:text-gray-400 rounded-xl hover:text-red-500 dark:hover:text-red-400 overflow-hidden group hover:bg-red-50/50 dark:hover:bg-red-900/30 transition-all duration-300 cursor-pointer"
                    title={t.auth.signOut}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                /* Not logged in */
                <>
                  <button
                    onClick={() => openAuthModal("login")}
                    className="relative px-5 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:text-gray-900 dark:hover:text-white overflow-hidden group bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">{t.auth.signIn}</span>
                  </button>

                  {/* Premium Get Started Button */}
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="relative group overflow-hidden rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6] via-[#8B5A8C] to-[#BD9587] animate-gradient-x"></div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5D6BC6] via-[#8B5A8C] to-[#BD9587] blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <span className="relative z-10 flex items-center space-x-2 px-6 py-2.5 text-white font-semibold">
                      <span>{t.auth.getStarted}</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 shadow-lg sm:shadow-xl hover:shadow-2xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <MenuIcon />
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-50"
          }`}
        ></div>
      </header>

      {/* Mobile Menu - Premium Glassmorphism */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-20 sm:top-24 right-3 left-3 sm:right-4 sm:left-4 bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

            <div className="relative p-4 sm:p-6">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link
                  href="/"
                  className={`block px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm ${
                    isActive("/")
                      ? "text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50"
                      : "text-gray-700 dark:text-gray-300 font-medium"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/portfolio"
                  className={`block px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm ${
                    isActive("/portfolio")
                      ? "text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50"
                      : "text-gray-700 dark:text-gray-300 font-medium"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.portfolio}
                </Link>
                {/* Marketplace link hidden for now
                <Link
                  href="/marketplace"
                  className={`block px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm ${
                    isActive("/marketplace")
                      ? "text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50"
                      : "text-gray-700 dark:text-gray-300 font-medium"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.marketplace}
                </Link>
                */}

                {/* Designer Menu hidden - transaction features disabled
                {isDesigner && (
                  <Link
                    href="/designer/products"
                    className={`block px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 text-sm ${
                      pathname?.startsWith("/designer")
                        ? "text-gray-900 dark:text-white font-semibold bg-white/50 dark:bg-gray-700/50"
                        : "text-gray-700 dark:text-gray-300 font-medium"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span>{t.nav.myProducts}</span>
                    </span>
                  </Link>
                )}
                */}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4"></div>

              {/* Settings Section */}
              <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-3 space-y-1">
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t.settings.language}
                  </span>
                  <LanguageToggle />
                </div>
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t.settings.theme}
                  </span>
                  <ThemeToggle />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4"></div>

              {/* Mobile Auth Section */}
              {loading ? (
                <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              ) : user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5D6BC6] to-[#1647A3] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 transition-all duration-300 cursor-pointer"
                  >
                    {t.auth.signOut}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("login");
                    }}
                    className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer"
                  >
                    {t.auth.signIn}
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("signup");
                    }}
                    className="w-full custom-gradient-bg text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    {t.auth.getStarted}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
