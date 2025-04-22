import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  FormControl as MUIFormControl,
  InputLabel as MUIInputLabel,
  TextField as MUITextField,
  Select as MUISelect,
  MenuItem as MUIMenuItem,
  Checkbox as MUICheckbox,
  FormControlLabel as MUIFormControlLabel,
  Radio as MUIRadio,
  RadioGroup as MUIRadioGroup,
  Switch as MUISwitch,
  FormHelperText as MUIFormHelperText,
  Slider as MUISlider,
  InputAdornment as MUIInputAdornment
} from '@mui/material';

// Custom styled TextField with glassmorphic design
export const TextField = styled(MUITextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    '&.Mui-focused': {
      border: '1px solid rgba(59, 130, 246, 0.5)',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.25)',
    }
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-root': {
    color: '#B3B3B3',
    '&.Mui-focused': {
      color: '#3B82F6',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiFormHelperText-root': {
    color: '#666666',
    marginLeft: '4px',
    marginTop: '4px',
    fontSize: '0.75rem',
  },
}));

// Custom styled Select with glassmorphic design
export const Select = styled(MUISelect)(({ theme }) => ({
  borderRadius: '0.75rem',
  backgroundColor: 'rgba(26, 26, 26, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  '&.Mui-focused': {
    border: '1px solid rgba(59, 130, 246, 0.5)',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.25)',
  },
  '& .MuiSelect-icon': {
    color: '#B3B3B3',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
}));

// Custom styled MenuItem for Select
export const MenuItem = styled(MUIMenuItem)(({ theme }) => ({
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
    }
  }
}));

// Custom styled FormControl
export const FormControl = styled(MUIFormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: '1rem',
}));

// Custom styled InputLabel
export const InputLabel = styled(MUIInputLabel)(({ theme }) => ({
  color: '#B3B3B3',
  fontSize: '0.875rem',
  '&.Mui-focused': {
    color: '#3B82F6',
  }
}));

// Custom styled FormHelperText
export const FormHelperText = styled(MUIFormHelperText)(({ theme }) => ({
  color: '#666666',
  fontSize: '0.75rem',
  marginLeft: '4px',
  marginTop: '4px',
}));

// Custom styled checkbox with glassmorphic styling
export const Checkbox = styled(MUICheckbox)(({ theme }) => ({
  color: '#B3B3B3',
  '&.Mui-checked': {
    color: '#3B82F6',
  },
  padding: '8px',
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  }
}));

// Custom styled form control label for checkbox
export const FormControlLabel = styled(MUIFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: '#FFFFFF',
  },
  marginBottom: '0.5rem',
}));

// Custom styled radio button
export const Radio = styled(MUIRadio)(({ theme }) => ({
  color: '#B3B3B3',
  '&.Mui-checked': {
    color: '#3B82F6',
  },
  padding: '8px',
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  }
}));

// Custom styled radio group
export const RadioGroup = styled(MUIRadioGroup)(({ theme }) => ({
  marginBottom: '0.5rem',
}));

// Custom styled switch
export const Switch = styled(MUISwitch)(({ theme }) => ({
  width: 46,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#3B82F6',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 24 / 2,
    backgroundColor: '#555555',
  },
}));

// Custom styled Slider
export const Slider = styled(MUISlider)(({ theme }) => ({
  color: '#3B82F6',
  height: 8,
  '& .MuiSlider-track': {
    height: 8,
    borderRadius: 4,
  },
  '& .MuiSlider-rail': {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#3B82F6',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.25)',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    padding: '4px 8px',
    fontSize: '0.75rem',
  },
}));

// Custom styled input adornment
export const InputAdornment = styled(MUIInputAdornment)(({ theme }) => ({
  color: '#B3B3B3',
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    color: '#B3B3B3',
  },
  '& svg': {
    fontSize: '1.25rem',
    color: '#B3B3B3',
  }
}));

// Form layout components
export const FormGroup = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '1.5rem',
});

export const FormRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  flexWrap: 'wrap',
  '@media (min-width: 768px)': {
    flexWrap: 'nowrap',
  },
});

export const FormLabel = styled('label')({
  display: 'block',
  marginBottom: '0.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#FFFFFF',
});

export const FormSection = styled('div')({
  background: 'rgba(26, 26, 26, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  marginBottom: '1.5rem',
}); 