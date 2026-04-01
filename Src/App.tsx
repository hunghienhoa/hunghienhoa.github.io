/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function App() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source
          src="https://raw.githubusercontent.com/hunghienhoa/hunghienhoa.github.io/refs/heads/main/Src/Video/462cfd8024ac40dcba53b9e789a95b2f.mov"
          type="video/mp4"
        />
      </video>

      {/* Navigation Bar */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-6">
        <div 
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Hùng Hiền Hòa<sup className="text-xs">®</sup>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm text-foreground transition-colors">
            Home
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Socials
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            AI × Me
          </a>
          <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Liuliuuuuu
          </a>
        </div>

        <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]">
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-40 text-center py-[90px]">
        <h1 
          className="liquid-glass-text animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          data-text="Hùng Hiền Hòa."
        >
          Hùng Hiền Hòa.
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Có những thứ luôn quẩn quanh cuộc đời bạn và đôi lúc không có lời giải thích, liệu rằng đó có phải là duyên số?!
        </p>

        <button className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]">
          Begin Journey
        </button>
      </section>
    </main>
  );
}
