"use client";

import Link from "next/link";
import { isRouteActive, type NavItem } from "@/content/global/navigation";
import styles from "./NavigationMegaMenu.module.css";
import { AfaqoArrow } from "@/components/icons/AfaqoIcon";

interface DesktopMegaMenuProps {
  item: NavItem;
  currentPath: string;
  onNavigate: () => void;
}

export function DesktopMegaMenu({ item, currentPath, onNavigate }: DesktopMegaMenuProps) {
  const menu = item.megaMenu;
  if (!menu) return null;

  const isServices = item.href === "/services";
  const isWork = item.href === "/work";

  return (
    <div className={styles.panel} id={`mega-menu-${item.href.slice(1)}`}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>{menu.eyebrow}</span>
        <p>{menu.description}</p>
        <Link href={item.href} onClick={onNavigate} className={styles.overviewLink}>
          {menu.overviewLabel} <AfaqoArrow size={16} aria-hidden="true" />
        </Link>
      </div>

      <ul className={`${styles.groups} ${isServices ? styles.servicesGrid : ""} ${isWork ? styles.workGrid : ""}`}>
        {menu.groups.map((group) => {
          const groupCurrent = isRouteActive(currentPath, group.href) && currentPath !== item.href;
          return (
            <li key={group.href} className={styles.group}>
              {group.index && <span className={styles.index}>{group.index}</span>}
              <Link
                href={group.href}
                onClick={onNavigate}
                className={`${styles.groupTitle} ${groupCurrent ? styles.current : ""}`}
                aria-current={groupCurrent ? "page" : undefined}
              >
                {group.label} <AfaqoArrow size={16} aria-hidden="true" />
              </Link>
              {group.description && <p className={styles.groupDescription}>{group.description}</p>}
              {group.children && (
                <ul className={styles.children}>
                  {group.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} onClick={onNavigate}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
