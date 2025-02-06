"use client";

import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routePaths, routes } from "@src/routes";

import styles from "./Header.module.scss";

const Header = () => {
  const pathname = usePathname();

  return (
    <header data-testid="header">
      <Navbar expand={false} className="bg-body-primary mb-3">
        <Container fluid>
          <div className={styles.header__image}>
            <Link href={`${routePaths.HOME_PAGE}`}>
              <Image src="/images/magic_logo.png" alt="Magic logo" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {routes.map((route, index) => (
                  <div className={styles.header__link} key={index}>
                    <Nav.Link href={route.path} disabled={pathname === route.path}>
                      {route.name}
                    </Nav.Link>
                  </div>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
