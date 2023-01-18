import styles from "./styles.module.css";

export const Button = (props) => {
    const { style_type, disable, children, onClick, modificateStyles, ...restProps } = props
    const buttonStyles = {
        'outlined': styles.outlined,
        'filled': styles.filled
    }

    const elementStyles = [modificateStyles, buttonStyles[style_type]]

    return (
        <button onClick={onClick} className={elementStyles.join(" ")} aria-label='Кнопка' type='button' {...restProps} >
            {children}
        </button>
    )
}


