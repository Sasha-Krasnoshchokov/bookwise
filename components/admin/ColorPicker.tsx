import { HexColorInput, HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
	value?: string;
	onPickerChange: (color: string) => void;
}
const ColorPicker = ({ value, onPickerChange }: ColorPickerProps) => {
	return (
		<div className='relative'>
			<div className='relative flex flex-row items-center mb-3'>
				<span className='absolute top-3 left-[14px] font-semibold'>#</span>
				<HexColorInput
					color={value}
					onChange={onPickerChange}
					className='hex-input book-form_input'
				/>
			</div>
			<HexColorPicker
				color={value}
				onChange={onPickerChange}
				style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
			/>
		</div>
	);
};

export default ColorPicker;
