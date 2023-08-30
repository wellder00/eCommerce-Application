import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const CustomChip = styled(Chip)({
  borderRadius: '16px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '1.2',
  border: '1px solid grey',
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'OneSize'];

type Props = {
  radioButton?: boolean;
  className?: string;
  sizeAtr?: string;
};

const FilterChip: React.FC<Props> = ({ radioButton, sizeAtr }) => {
  const [activeChip, setActiveChip] = useState<string>('');
  const [activeChips, setActiveChips] = useState<string[]>([]);

  useEffect(() => {
    const sizeFilter = { [sizeAtr as string]: activeChips };
    console.log(sizeFilter);
  }, [sizeAtr, activeChips]);

  const handleChipClick = (label: string): void => {
    if (activeChip === label) {
      setActiveChip('');
    } else {
      setActiveChip(label);
    }
  };

  const handleChipsClick = (label: string): void => {
    if (activeChips.includes(label)) {
      setActiveChips(activeChips.filter((chip) => chip !== label));
    } else {
      setActiveChips([...activeChips, label]);
    }
  };

  return (
    <>
      <h3>Size</h3>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) =>
          radioButton ? (
            <CustomChip
              key={size}
              label={size}
              color="primary"
              variant={activeChip === size ? 'filled' : 'outlined'}
              onClick={(): void => handleChipClick(size)}
            />
          ) : (
            <CustomChip
              key={size}
              label={size}
              color="primary"
              variant={activeChips.includes(size) ? 'filled' : 'outlined'}
              onClick={(): void => handleChipsClick(size)}
            />
          )
        )}
      </Box>
    </>
  );
};

export default FilterChip;
