import {
	FormInputLabel,
	Input,
	Group
} from '../form-input/form-input.styles.jsx';

const FormInput = ({ label, changeHandler, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
