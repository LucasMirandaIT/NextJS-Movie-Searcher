import styles from './Footer.module.css';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Tooltip } from '@mui/material';


import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Footer = (() => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const linkRel = "noreferrer";


  return (
    <footer className={styles.footer}>
      <div style={{ width: '10%' }}>
      </div>

      <div style={{ display: 'flex' }}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel={linkRel}
        >
          {t('footerMadeBy')}

        </a>
        <a href="https://www.linkedin.com/in/lucas-miranda-365b93140/" target="_blank" rel={linkRel}>
          <Tooltip title="Lucas Miranda" arrow>
            <LinkedInIcon className={styles.contactsLogo} />
          </Tooltip>
        </a>
        <a href="https://github.com/LucasMirandaIT" target="_blank" rel={linkRel}>
          <Tooltip title="LucasMirandaIT" arrow>
            <GitHubIcon className={styles.contactsLogo} />
          </Tooltip>
        </a>
      </div>

      <div className={styles.translationContainer}>
        <Link href={router.asPath} locale={'pt'}>
          <img src="assets/images/br_flag.svg" className={styles.countriesFlag} alt="Brazil Flag for internationalization" />
        </Link>
        <Link href={router.asPath} locale={'en'}>
          <img src="assets/images/us_flag.svg" className={styles.countriesFlag} alt="United States Flag for internationalization" />
        </Link>
        <Link href={router.asPath} locale={'de'}>
          <img src="assets/images/de_flag.png" className={styles.countriesFlag} alt="Germany Flag for internationalization" />
        </Link>
      </div>
    </footer>
  )
})
export default Footer
