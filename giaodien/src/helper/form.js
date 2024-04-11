import React from "react";
import Form from 'react-bootstrap/Form';

const GenericForm = ({fields, formData, setFormData}) => {
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        let fieldValue = formData[name] || [];
        if (type === 'checkbox') {
            if (checked) {
                fieldValue = [...fieldValue, value];
            } else {
                fieldValue = fieldValue.filter(item => item !== value);
            }
        } else {
            fieldValue = value;
        }
        setFormData({
            ...formData,
            [name]: fieldValue
        });
    };

    return (
        <Form 
        >
            {fields.map((field, index) => (
            <Form.Group key={index} controlId={field.id}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'select' ? (
                    <Form.Select 
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                    >
                        {field.options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Select> 
                ) :
                field.type === 'checkbox' ? (
                        <div>
                            {field.options.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    label={option.label}
                                    name={field.name}
                                    value={option.value}
                                    checked = {formData[field.name] && formData[field.name].includes(option.value)}
                                    onChange={handleChange}
                                />
                            ))}
                        </div>
                    ) : (
                    <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        name ={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className={field.className}
                    >
                    </Form.Control>
                    )}
            </Form.Group>
            ))}

        </Form>
        );
};

export default GenericForm