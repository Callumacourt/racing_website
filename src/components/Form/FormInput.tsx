import styles from './GeneralForm.module.css'

function FormInput ({
    name, 
    label,
    type,
    kind = 'input', 
    value, 
    error, 
    onChange, 
    required
}: {
    name: string;
    label: string;
    type: string;
    kind: string;
    value: string;
    error?: string;
    onChange: (name: string, value: string) => void;
    required?: boolean;
}) {
    const renderInput = () => {
        if (kind === 'textarea') {
            return (
                <textarea 
                    name={name}
                    id={name}
                    value={value}
                    onChange={(e) => onChange(name, e.currentTarget.value)}
                    required={required}
                    className={error ? styles.textareaError : ''}
                />
            )
        }
        
        return (
            <input 
                type={type} 
                name={name}
                id={name}
                value={value}
                onChange={(e) => onChange(name, e.currentTarget.value)}
                required={required}
                aria-label={label}
                className={error ? styles.inputError : ''}
            />
        )
    }

    return (
        <>
            <div className={styles.labelWrapper}>
                <label htmlFor={name}>{label}</label>
                {!required && <small className={styles.optionalText}>(Optional)</small>}
            </div>
            {renderInput()}
            <small className={error ? styles.activeErr : styles.hiddenErr}>
                <i>{error}</i>
            </small>
        </>
    )
}

export default FormInput;