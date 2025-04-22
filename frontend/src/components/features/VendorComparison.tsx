import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton as MuiIconButton,
  Button as MuiButton,
  Chip as MuiChip
} from '@mui/material';
import { ArrowForward, Refresh, Download } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Styled components with glassmorphic effect
const GlassPanel = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  borderRadius: 16,
  padding: theme.spacing(3),
  color: '#FFFFFF',
}));

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
}));

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  color: '#B3B3B3',
  '&:hover': {
    color: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
}));

const StyledChip = styled(MuiChip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  fontSize: '0.75rem',
  height: 24,
}));

// Mock vendor data
const mockVendors = [
  { 
    id: 1, 
    name: 'Vendor A', 
    price: '$1,245.00', 
    reliability: 95, 
    leadTime: '3-5 days',
    quality: 'High',
    status: 'Available'
  },
  { 
    id: 2, 
    name: 'Vendor B', 
    price: '$1,120.00', 
    reliability: 88, 
    leadTime: '7-10 days',
    quality: 'Medium',
    status: 'Available'
  },
  { 
    id: 3, 
    name: 'Vendor C', 
    price: '$950.00', 
    reliability: 79, 
    leadTime: '10-14 days',
    quality: 'Medium',
    status: 'Limited'
  },
];

const VendorComparison: React.FC = () => {
  const [vendors, setVendors] = useState(mockVendors);

  const refreshData = () => {
    // In a real app, this would fetch new data
    console.log('Refreshing vendor data...');
  };

  const downloadReport = () => {
    // In a real app, this would generate a report
    console.log('Downloading vendor comparison report...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="600" gutterBottom>
          Vendor Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Compare vendors based on price, reliability, and other key metrics
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <StyledButton 
            variant="contained" 
            startIcon={<Refresh />}
            onClick={refreshData}
          >
            Refresh Data
          </StyledButton>
          <StyledButton 
            variant="outlined" 
            startIcon={<Download />}
            onClick={downloadReport}
            sx={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF'
            }}
          >
            Export Report
          </StyledButton>
        </Box>
      </Box>

      <GlassPanel>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Vendor</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Reliability</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Lead Time</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Quality</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: '#B3B3B3', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow 
                  key={vendor.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    transition: 'background-color 0.3s'
                  }}
                >
                  <TableCell sx={{ color: '#FFFFFF' }}>{vendor.name}</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }}>{vendor.price}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: '100%', 
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 1,
                          height: 8
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: `${vendor.reliability}%`, 
                            backgroundColor: vendor.reliability > 90 ? '#10B981' : vendor.reliability > 80 ? '#F59E0B' : '#EF4444',
                            borderRadius: 1,
                            height: 8
                          }} 
                        />
                      </Box>
                      <Typography variant="body2" sx={{ ml: 1, color: '#B3B3B3' }}>
                        {vendor.reliability}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }}>{vendor.leadTime}</TableCell>
                  <TableCell>
                    <StyledChip 
                      label={vendor.quality} 
                      color={vendor.quality === 'High' ? 'success' : 'default'}
                      variant={vendor.quality === 'High' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <StyledChip 
                      label={vendor.status} 
                      color={vendor.status === 'Available' ? 'success' : 'warning'}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <StyledIconButton aria-label="View details">
                      <ArrowForward fontSize="small" />
                    </StyledIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassPanel>
    </motion.div>
  );
};

export default VendorComparison; 