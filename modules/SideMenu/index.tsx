import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import classes from "../../styles/sidemenu.module.scss";
import {CSSProperties, forwardRef, LegacyRef} from "react";
import ArrowRigth from "../../assets/icons/right-arrow.svg";
import Button from "../../components/Button/Button";

interface IsideMenuProps {
    style?: CSSProperties;
    isOpenMenu: any;
}

function SideMenu(
    {style, isOpenMenu}: IsideMenuProps,
    ref: LegacyRef<HTMLDivElement>
): JSX.Element {
    const notes = localStorage.getItem("notes")
        ? JSON.parse(localStorage.getItem("notes"))
        : null;

    return (
        <div className={classes.overlay}>
            <div className={classes.sidemenu} ref={ref} style={style}>
                <div className={classes.header}>
                    <Button onClick={() => isOpenMenu(false)} className={classes.buttons} type="button">
                        <ArrowRigth height={30} width={30}/>
                    </Button>
                    <ThemeToggle className={classes.buttons}/>
                </div>
                <div className={classes.body}>
                    <p>По вопросам:</p>
                    <div className={classes.contacts}>
                        <a href="tel:+375291331506">+375 (29) 133-15-06</a>
                        <a href="email:chudovskaja@bsu.by">Chudovskaja@bsu.by</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(SideMenu);
