import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Hourglass,
  Navigation,
} from 'lucide-react';
import styles from './Kyc.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KycWarningCard = ({title,message}) => {
  const { user } = useSelector((state) => state.userAuth);
  const status = user?.kycVerified;
  let navigate = useNavigate()


  let Icon = null;
  let cardStyle = styles.kycCard;

  const handleKycClick = () => {
    // You can navigate or open a modal here
    navigate('/registeration')
  };

  return (
    <div className={cardStyle}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        {status === 'false' && (
          <button onClick={handleKycClick} className={styles.kycButton}>
            Complete KYC Now
          </button>
        )}
      </div>
    </div>
  );
};

export default KycWarningCard;

