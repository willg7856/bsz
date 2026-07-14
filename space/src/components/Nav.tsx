"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content";
import { Logo } from "@/components/Button";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const vehicleActive = nav.vehicles.some((v) => pathname.startsWith(v.href));

  return (
    <header className="sticky top-0 z-50 bg-nav/95 backdrop-blur-sm border-b border-rule">
      <div className="container-site flex items-center justify-between h-14 gap-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {nav.links.slice(0, 2).map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`type-label transition-colors duration-200 ${
                  active ? "text-light font-bold" : "text-dim hover:text-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="relative group h-14 flex items-center">
            <button
              type="button"
              className={`type-label inline-flex items-center gap-2 transition-colors duration-200 ${
                vehicleActive ? "text-light font-bold" : "text-dim group-hover:text-light"
              }`}
              aria-haspopup="true"
            >
              Vehicles
              <span
                className="inline-block w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-current opacity-70 group-hover:rotate-180 transition-transform duration-200"
                aria-hidden
              />
            </button>
            <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto transition-opacity duration-200 z-50">
              <div className="min-w-[280px] border border-rule bg-nav p-2">
                {nav.vehicles.map((v) => {
                  const active = pathname.startsWith(v.href);
                  return (
                    <Link
                      key={v.href}
                      href={v.href}
                      className={`block px-3.5 py-3 transition-colors duration-200 ${
                        active ? "bg-panel text-light" : "text-dim hover:bg-panel hover:text-light"
                      }`}
                    >
                      <span className="type-label block font-bold tracking-[0.12em]">
                        {v.label}
                      </span>
                      <span className="block mt-1 text-[12px] font-sans font-normal tracking-normal normal-case text-muted leading-snug">
                        {v.note}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {nav.links.slice(2).map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`type-label transition-colors duration-200 ${
                  active ? "text-light font-bold" : "text-dim hover:text-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={nav.sisterCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label bg-hot text-light px-4 py-2 rounded-machined hover:brightness-110 transition-[filter] duration-200"
          >
            {nav.sisterCta.label}
          </a>
        </nav>
        <button
          type="button"
          className="md:hidden type-label text-dim border border-rule px-3 py-2 rounded-machined"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-rule bg-nav px-[clamp(20px,4vw,40px)] py-4 flex flex-col gap-3"
          aria-label="Mobile"
        >
          {nav.links.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-label text-dim py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            className={`type-label py-2 text-left inline-flex items-center gap-2 ${
              vehicleActive || vehiclesOpen ? "text-light" : "text-dim"
            }`}
            aria-expanded={vehiclesOpen}
            onClick={() => setVehiclesOpen((v) => !v)}
          >
            Vehicles
            <span
              className={`inline-block w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-current opacity-70 transition-transform duration-200 ${
                vehiclesOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          {vehiclesOpen
            ? nav.vehicles.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="type-label text-dim py-1 pl-4"
                  onClick={() => setOpen(false)}
                >
                  {v.label}
                </Link>
              ))
            : null}

          {nav.links.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-label text-dim py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={nav.sisterCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label bg-hot text-light px-4 py-3 rounded-machined text-center"
            onClick={() => setOpen(false)}
          >
            {nav.sisterCta.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
