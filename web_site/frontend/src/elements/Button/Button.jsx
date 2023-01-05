import styles from "./styles.module.css";

export const Button = (props) => {
    const { style_type, disable, children, onClick, modificateStyles, ...restProps } = props
    const buttonStyles = {
        'outlined': styles.outlined,
        'filled': styles.filled
    }

    return (
        <button onClick={onClick} className={buttonStyles[style_type]} aria-label='Кнопка' {...restProps} type='button'>
            {children}
        </button>
    )
}


