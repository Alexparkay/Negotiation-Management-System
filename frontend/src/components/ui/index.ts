import { Button as MUIButton, IconButton as MUIIconButton, Chip as MUIChip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled Button with our glassmorphic design
export const Button = styled(MUIButton)(({ theme }) => ({
  borderRadius: '0.75rem',
  textTransform: 'none',
  fontWeight: 500,
  padding: '0.5rem 1rem',
  '&.MuiButton-contained': {
    background: 'rgba(59, 130, 246, 0.9)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    '&:hover': {
      background: 'rgba(59, 130, 246, 1)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      background: 'rgba(255, 255, 255, 0.05)',
    },
  },
}));

// Custom styled IconButton
export const IconButton = styled(MUIIconButton)(({ theme }) => ({
  color: '#FFFFFF',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

// Custom styled Chip
export const Chip = styled(MUIChip)(({ theme }) => ({
  borderRadius: '0.5rem',
  backgroundColor: 'rgba(42, 42, 42, 0.7)',
  backdropFilter: 'blur(12px)',
  color: '#FFFFFF',
  '& .MuiChip-label': {
    paddingLeft: 8,
    paddingRight: 8,
  },
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
}));

// Export all form components
export * from './form'; 