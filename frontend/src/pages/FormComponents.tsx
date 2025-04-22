import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdSave, MdDelete, MdOutlineAttachMoney, MdPerson, MdOutlineEmail, MdPhone } from 'react-icons/md';
import { Button, IconButton } from '@/components/ui';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  InputAdornment,
  FormGroup,
  FormRow,
  FormLabel,
  FormSection
} from '@/components/ui/form';

const FormComponents: React.FC = () => {
  // States for form controls
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  
  // Demo categories
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'food', label: 'Food & Beverages' },
    { value: 'health', label: 'Health & Beauty' }
  ];
  
  // Card enter animation
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold mb-6"
      >
        Form Components
      </motion.h1>
      
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FormSection>
          <h2 className="text-xl font-semibold mb-4">Text Inputs</h2>
          <FormGroup>
            <FormRow>
              <FormControl>
                <TextField 
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPerson />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              
              <FormControl>
                <TextField 
                  label="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineEmail />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </FormRow>
            
            <FormRow>
              <FormControl>
                <TextField 
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPhone />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              
              <FormControl>
                <TextField 
                  label="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter your budget"
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAttachMoney />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </FormRow>
          </FormGroup>
        </FormSection>
      </motion.div>
      
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FormSection>
          <h2 className="text-xl font-semibold mb-4">Select & Dropdowns</h2>
          <FormGroup>
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a product category</FormHelperText>
            </FormControl>
          </FormGroup>
        </FormSection>
      </motion.div>
      
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FormSection>
          <h2 className="text-xl font-semibold mb-4">Toggle Controls</h2>
          <FormGroup>
            <FormRow>
              <div className="flex-1">
                <FormLabel>Switch</FormLabel>
                <div className="flex items-center">
                  <Switch
                    checked={switchValue}
                    onChange={(e) => setSwitchValue(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    {switchValue ? 'On' : 'Off'}
                  </span>
                </div>
              </div>
              
              <div className="flex-1">
                <FormLabel>Checkbox</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValue}
                      onChange={(e) => setCheckboxValue(e.target.checked)}
                    />
                  }
                  label="I agree to terms"
                />
              </div>
            </FormRow>
            
            <FormRow>
              <div className="flex-1">
                <FormLabel>Radio Options</FormLabel>
                <RadioGroup
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                  <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                </RadioGroup>
              </div>
            </FormRow>
          </FormGroup>
        </FormSection>
      </motion.div>
      
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FormSection>
          <h2 className="text-xl font-semibold mb-4">Range Controls</h2>
          <FormGroup>
            <FormLabel>Slider: {sliderValue}</FormLabel>
            <Slider
              value={sliderValue}
              onChange={(_, newValue) => setSliderValue(newValue as number)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </FormGroup>
        </FormSection>
      </motion.div>
      
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <FormSection>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <FormGroup>
            <FormRow>
              <Button variant="contained" startIcon={<MdSave />}>
                Save
              </Button>
              <Button variant="outlined" startIcon={<MdDelete />}>
                Cancel
              </Button>
              <IconButton>
                <MdSave />
              </IconButton>
            </FormRow>
          </FormGroup>
        </FormSection>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-sm text-gray-400"
      >
        <p>These components follow the project's glassmorphic UI design system</p>
      </motion.div>
    </div>
  );
};

export default FormComponents; 