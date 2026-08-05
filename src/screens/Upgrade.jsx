import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Upgrade.module.css';
import Sidebar from '../components/MobileSideBar';
import 'react-activity/dist/library.css';
import DesktopSideBar from '../components/DesktopSideBar';
import LoadingSkeleton from '../components/Loader';
import AuthModal from '../Modal/AuthModal';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BackHeader from '../components/DashboardHeader';
import { useDispatch, useSelector } from 'react-redux';
import KycWarningCard from '../components/Kyc';
import { fetchPackages, fetchInvestment } from '../store/action/appStorage';

const Upgrade = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authInfo, setAuthInfo] = useState("");
  const [plans, setPlans] = useState([]);
  const [investment, setInvestment] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userAuth);
   const currencyMap = {
  // North America
  US: "USD",
  USA: "USD",
  "UNITED STATES": "USD",

  CA: "CAD",
  CANADA: "CAD",

  MX: "MXN",
  MEXICO: "MXN",

  // South America
  AR: "ARS",
  ARGENTINA: "ARS",

  BR: "BRL",
  BRAZIL: "BRL",

  CL: "CLP",
  CHILE: "CLP",

  CO: "COP",
  COLOMBIA: "COP",

  PE: "PEN",
  PERU: "PEN",

  VE: "VES",
  VENEZUELA: "VES",

  EC: "USD",
  ECUADOR: "USD",

  UY: "UYU",
  URUGUAY: "UYU",

  PY: "PYG",
  PARAGUAY: "PYG",

  BO: "BOB",
  BOLIVIA: "BOB",

  GY: "GYD",
  GUYANA: "GYD",

  SR: "SRD",
  SURINAME: "SRD",

  // Europe
  GB: "GBP",
  UK: "GBP",
  "UNITED KINGDOM": "GBP",

  IE: "EUR",
  IRELAND: "EUR",

  FR: "EUR",
  FRANCE: "EUR",

  DE: "EUR",
  GERMANY: "EUR",

  IT: "EUR",
  ITALY: "EUR",

  ES: "EUR",
  SPAIN: "EUR",

  PT: "EUR",
  PORTUGAL: "EUR",

  NL: "EUR",
  NETHERLANDS: "EUR",

  BE: "EUR",
  BELGIUM: "EUR",

  LU: "EUR",
  LUXEMBOURG: "EUR",

  AT: "EUR",
  AUSTRIA: "EUR",

  FI: "EUR",
  FINLAND: "EUR",

  GR: "EUR",
  GREECE: "EUR",

  SI: "EUR",
  SLOVENIA: "EUR",

  SK: "EUR",
  SLOVAKIA: "EUR",

  EE: "EUR",
  ESTONIA: "EUR",

  LV: "EUR",
  LATVIA: "EUR",

  LT: "EUR",
  LITHUANIA: "EUR",

  CY: "EUR",
  CYPRUS: "EUR",

  MT: "EUR",
  MALTA: "EUR",

  HR: "EUR",
  CROATIA: "EUR",

  CH: "CHF",
  SWITZERLAND: "CHF",

  NO: "NOK",
  NORWAY: "NOK",

  SE: "SEK",
  SWEDEN: "SEK",

  DK: "DKK",
  DENMARK: "DKK",

  PL: "PLN",
  POLAND: "PLN",

  CZ: "CZK",
  "CZECH REPUBLIC": "CZK",
  CZECHIA: "CZK",

  HU: "HUF",
  HUNGARY: "HUF",

  RO: "RON",
  ROMANIA: "RON",

  BG: "BGN",
  BULGARIA: "BGN",

  RS: "RSD",
  SERBIA: "RSD",

  UA: "UAH",
  UKRAINE: "UAH",

  RU: "RUB",
  RUSSIA: "RUB",

  TR: "TRY",
  TURKEY: "TRY",

  // Africa
  NG: "NGN",
  NIGERIA: "NGN",

  GH: "GHS",
  GHANA: "GHS",

  KE: "KES",
  KENYA: "KES",

  UG: "UGX",
  UGANDA: "UGX",

  TZ: "TZS",
  TANZANIA: "TZS",

  RW: "RWF",
  RWANDA: "RWF",

  ET: "ETB",
  ETHIOPIA: "ETB",

  EG: "EGP",
  EGYPT: "EGP",

  MA: "MAD",
  MOROCCO: "MAD",

  DZ: "DZD",
  ALGERIA: "DZD",

  TN: "TND",
  TUNISIA: "TND",

  ZA: "ZAR",
  "SOUTH AFRICA": "ZAR",

  ZM: "ZMW",
  ZAMBIA: "ZMW",

  ZW: "USD",
  ZIMBABWE: "USD",

  AO: "AOA",
  ANGOLA: "AOA",

  CM: "XAF",
  CAMEROON: "XAF",

  CI: "XOF",
  "COTE D'IVOIRE": "XOF",
  IVORY_COAST: "XOF",

  SN: "XOF",
  SENEGAL: "XOF",

  ML: "XOF",
  MALI: "XOF",

  BF: "XOF",
  "BURKINA FASO": "XOF",

  BJ: "XOF",
  BENIN: "XOF",

  TG: "XOF",
  TOGO: "XOF",

  GA: "XAF",
  GABON: "XAF",

  CG: "XAF",
  CONGO: "XAF",

  CD: "CDF",
  DRC: "CDF",
  "DEMOCRATIC REPUBLIC OF CONGO": "CDF",

  // Middle East
  AE: "AED",
  UAE: "AED",
  "UNITED ARAB EMIRATES": "AED",

  SA: "SAR",
  "SAUDI ARABIA": "SAR",

  QA: "QAR",
  QATAR: "QAR",

  KW: "KWD",
  KUWAIT: "KWD",

  OM: "OMR",
  OMAN: "OMR",

  BH: "BHD",
  BAHRAIN: "BHD",

  JO: "JOD",
  JORDAN: "JOD",

  IL: "ILS",
  ISRAEL: "ILS",

  IR: "IRR",
  IRAN: "IRR",

  IQ: "IQD",
  IRAQ: "IQD",

  LB: "LBP",
  LEBANON: "LBP",

  // Asia
  CN: "CNY",
  CHINA: "CNY",

  JP: "JPY",
  JAPAN: "JPY",

  KR: "KRW",
  "SOUTH KOREA": "KRW",

  KP: "KPW",
  "NORTH KOREA": "KPW",

  IN: "INR",
  INDIA: "INR",

  PK: "PKR",
  PAKISTAN: "PKR",

  BD: "BDT",
  BANGLADESH: "BDT",

  LK: "LKR",
  "SRI LANKA": "LKR",

  NP: "NPR",
  NEPAL: "NPR",

  MM: "MMK",
  MYANMAR: "MMK",

  TH: "THB",
  THAILAND: "THB",

  VN: "VND",
  VIETNAM: "VND",

  MY: "MYR",
  MALAYSIA: "MYR",

  SG: "SGD",
  SINGAPORE: "SGD",

  ID: "IDR",
  INDONESIA: "IDR",

  PH: "PHP",
  PHILIPPINES: "PHP",

  KH: "KHR",
  CAMBODIA: "KHR",

  LA: "LAK",
  LAOS: "LAK",

  MN: "MNT",
  MONGOLIA: "MNT",

  // Oceania
  AU: "AUD",
  AUSTRALIA: "AUD",

  NZ: "NZD",
  "NEW ZEALAND": "NZD",

  FJ: "FJD",
  FIJI: "FJD",

  PG: "PGK",
  "PAPUA NEW GUINEA": "PGK"
};

const currencyCode =
  currencyMap[user?.country?.toUpperCase()] || "USD";

const formatCurrency = (amount) =>{
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(Number(amount || 0));
}

  // Fetch user investment
  const fetchInvest = async () => {
    const res = await dispatch(fetchInvestment(user?._id));
    if (!res) {
      setAuthInfo(res?.message ?? "Failed to fetch investment");
      return setIsAuthError(true);
    }
    setInvestment(res.message);
    setAuthInfo(
      `Your current plan is ${res?.message?.investmentPlan ?? "N/A"}. Contact administrator if you intend to change your investment plan`
    );
    return setIsAuthError(true);
  };

  // Fetch all plans
  const fetchAllPlans = async () => {
    const res = await dispatch(fetchPackages());
    if (!res) {
      setIsAuthError(true);
      setAuthInfo(res?.message ?? "Failed to fetch plans");
      return;
    }
    setPlans(res.message ?? []);
  };

  useEffect(() => {
    fetchInvest();
    fetchAllPlans();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const fetchCryptoData = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        const data = await res.json();
        setCryptoData(data ?? []);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };
    fetchCryptoData();
  }, []);

  const updateAuthError = () => {
    setIsAuthError(prev => !prev);
    setAuthInfo('');
  };

  const notificationHandler = () => {
    navigate('/notifications');
  };

  const openMobileMenu = () => {
    setSidebarOpen(prev => !prev);
  };

  const navigateMobileHandler = (url) => {
    navigate(`/${url}`);
  };

  const navigatePlanHandler = () => {
    navigate('/fund-account');
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
  {isAuthError && (
    <AuthModal
      modalVisible={isAuthError}
      updateVisibility={updateAuthError}
      message={authInfo}
    />
  )}

  <div className={styles.dashboard}>
    <div className={styles.leftSection}>
      <DesktopSideBar
        isInvest={true}
        navigateMobileHandler={navigateMobileHandler}
      />
    </div>

    {sidebarOpen && (
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isInvest={true}
        navigateMobileHandler={navigateMobileHandler}
      />
    )}

    <div className={styles.mainSection}>
      <BackHeader
        openMobileMenu={openMobileMenu}
        notificationHandler={notificationHandler}
        sidebarOpen={sidebarOpen}
        title="Our Plans"
      />

      <section className={styles.pricingSection}>
        <div className={styles.cardWrapper}>
          {(plans ?? []).map((plan, index) => (
            <div
              className={styles.card}
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <h2 className={styles.planName}>
                {plan?.name ?? "Unnamed Plan"}
              </h2>

              <p className={styles.planPrice}>
                {formatCurrency(plan?.price)}
              </p>

              <ul className={styles.featureList}>
                {(plan?.features ?? []).map((feature, i) => (
                  <li key={i}>{feature ?? "N/A"}</li>
                ))}
              </ul>

              <button
                style={{
                  backgroundColor:
                    investment?.investmentPlan?.toLowerCase() ===
                    plan?.name?.toLowerCase()
                      ? "orangered"
                      : "",
                }}
                className={styles.upgradeBtn}
                onClick={navigatePlanHandler}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
</>
  );
};

export default Upgrade;
