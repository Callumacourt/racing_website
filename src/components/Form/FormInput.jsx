import styles from './FormInput.module.css'

function FormInput ({name, label, type, value, error, onChange, required}) {
    return (
        <>
        <label htmlFor={name}>{label}</label>
        <input 
            type={type} 
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            required = {required}
            className = {error ? styles.inputError : ''}
        />
        <small className = {error ? styles.activeErr : styles.hiddenErr}>
            <i>{error}</i>
        </small>
        </>
    )
}

export default FormInput;