import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';

import styles from './Search.module.css';
import { styled } from '@mui/system';
import useDebounce from '../../hooks/useDebounce';

import Link from 'next/link';

import useTranslation from 'next-translate/useTranslation'
// import useTranslation from 'next-translate/useTranslation'
// const {t, lang} = useTranslation('home');
const SearchInput = styled(TextField)({
    '& svg': {
        color: '#FFFFFF',
        transition: '.6s all',
    },
    '& button:hover svg': {
        transition: '.6s all',
        color: '#01D277',
    },
    '& input': {
        color: '#FFFFFF',
    },
    '& label': {
        color: '#FFFFFF',
    },
    '& label.Mui-focused': {
        color: '#01D277',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#01D277',
    },
    '& .MuiInput-root': {
        '&:before': {
            borderColor: '#FFF',
        },
        '&:hover': {
            '&:before': {
                borderColor: '#FFF',
            }
        },
    },
});

const Search = (({ inputChange }) => {
    
    const [inputValue, setInputValue] = useState('');
    const {t, lang} = useTranslation('search');

    const handleClearClick = () => {
        setInputValue('');
        return inputChange('');
    };

    const debouncedSearch = useDebounce(inputValue, 300);

    useEffect(() => {
        return inputChange(inputValue);
    }, [debouncedSearch]);


    return (
        <>

            <SearchInput
                label={t('searchLabel')}
                id="searchMovie"
                value={inputValue}
                style={{ flex: 1, width: '90%', maxWidth: '350px' }}
                onChange={(e) => setInputValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClearClick}
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    className: styles.customInput,
                    autoComplete: 'off',
                }}
                variant="standard"
            />
            {!inputValue && (
                <>
                    <h1>
                        {t('or')}
                    </h1>
                    <Link href="recommendations">
                        <Button className={styles.buttonFilters}>{t('letMeHelpButton')}</Button>
                    </Link>
                </>
            )}

        </>
    );
});

export default Search;