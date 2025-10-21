"use client"

import * as React from "react"
import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/navigation-menu"

const links = [
  {
    href: "/",
    name: "Log"
  },
  {
    href: "/purchases",
    name: "View"
  },
  // {
  //   href: "/user",
  //   name: "User"
  // }
]

export function SiteMenu({ isSignedIn }: { isSignedIn: boolean }) {
  const isMobile = useIsMobile()

  return (
    <div className="flex gap-4 p-4 fixed z-1 top-0 left-0 bg-white w-full shadow-md">
      <div className="text-4xl">
        NuBuj
      </div>
      {isSignedIn
        ? (
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">
              {links.map(({ href, name }) =>
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link className="text-xl" href={href}>{name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>
        )
        : null
      }
    </div>
  )
}
