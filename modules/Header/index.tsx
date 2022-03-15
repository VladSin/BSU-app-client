import Router from "next/router";
import {useEffect, useRef, useState} from "react";
import {Transition} from "react-transition-group";
import Button from "../../components/Button/Button";
import classes from "../../styles/header.module.scss";
import Menu from "../../assets/icons/menu.svg";
import Logo from "../../assets/images/bsu-logo.svg";
import SideMenu from "../SideMenu";

function Header() {
    const linkHomePage = (): void => {
        Router.push("/");
    };

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    let menuRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    const defaultStyle = {
        transition: `300ms`,
    };
    const transitionStyles = {
        entering: {right: "-250px"},
        entered: {right: "0"},
        exiting: {right: "-250px"},
        exited: {right: "-250px"},
    };

    return (
        <header className={classes.header}>
            <div className={classes.sticky}>
                <div className={classes.logo}>
                    <Logo height={44} width={150} onClick={linkHomePage}/>
                </div>
                <div>
                    <Button
                        onClick={() => console.log("click")}
                        className="icons"
                        type={"button"}
                    >
                    </Button>
                    <Button
                        onClick={() => setIsOpenMenu((prev) => !prev)}
                        type={"button"}
                        className="icons"
                    >
                        <Menu height={30} width={30}/>
                    </Button>
                </div>
            </div>
            <Transition
                in={isOpenMenu}
                nodeRef={menuRef}
                timeout={{
                    enter: 0,
                    exit: 200,
                }}
                mountOnEnter
                unmountOnExit
            >
                {(state) => (
                    <SideMenu
                        ref={menuRef}
                        isOpenMenu={setIsOpenMenu}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    />
                )}
            </Transition>
        </header>
    );
}

export default Header;
