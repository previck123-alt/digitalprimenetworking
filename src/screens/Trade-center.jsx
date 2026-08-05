import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Trade-center.module.css';
import Sidebar from '../components/MobileSideBar';
import 'react-activity/dist/library.css';
import DesktopSideBar from '../components/DesktopSideBar';
import AuthModal from '../Modal/AuthModal';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BackHeader from '../components/DashboardHeader';
import { SpinnerModal } from '../Modal/SpinnerModal';
import { fetchTrade } from '../store/action/appStorage';
import { useDispatch, useSelector } from 'react-redux';
import KycWarningCard from '../components/Kyc';
import MultiCoinChart from './Chart';

const TradeCenter = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthError, setIsAuthError] = useState(false);
  const [authInfo, setAuthInfo] = useState('');
  const [trades, setTrades] = useState([]);
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
  const dispatch = useDispatch();

  const buttonRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  // ✅ Helper for safe formatting
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) return '0.00';
    return Number(value).toFixed(decimals);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const fetchCryptoData = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        const data = await res.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const asyncall = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await dispatch(fetchTrade(user));
      if (!res.bool) {
        setAuthInfo(res.message);
        setIsAuthError(true);
        setLoading(false);
        return;
      }
      setTrades(res.message || []);
      setLoading(false);
    } catch (err) {
      setAuthInfo(err.message);
      setIsAuthError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncall();
  }, []);

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo('');
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    buttonRef.current.initialX = e.clientX - position.x;
    buttonRef.current.initialY = e.clientY - position.y;
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - buttonRef.current.initialX;
    const newY = e.clientY - buttonRef.current.initialY;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const navigateMobileHandler = (url) => {
    return navigate(`/${url}`);
  };

  const openMobileMenu = () => {
    setSidebarOpen(true);
  };

  const notificationHandler = () => {
    alert('Notifications clicked'); // Replace with real logic as needed
  };

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
        title="Profile"
      />

      {/* ✅ Crypto ticker */}
      <div className={styles.tickerTape} style={{ margin: "0 10px" }}>
        <div className={styles.tickerInner}>
          {cryptoData.map((coin, index) => (
            <div key={index} className={styles.tickerItem}>
              <img
                src={coin.image}
                alt={coin.name}
                className={styles.coinIcon}
              />

              <span className={styles.coinName}>
                {coin.symbol?.toUpperCase() ?? "---"}
              </span>

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? styles.priceUp
                    : styles.priceDown
                }
              >
                {formatCurrency(coin.current_price)} (
                {formatNumber(coin.price_change_percentage_24h)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ marginTop: "50px" }}>
          <SpinnerModal />
        </div>
      ) : (
        <>
          <div className={styles.tradeSummaryCard}>
            <button
              ref={buttonRef}
              onMouseDown={handleMouseDown}
              className={styles.ctaButton}
              style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: dragging ? "grabbing" : "grab",
                zIndex: 200,
              }}
            >
              Create active trade
            </button>

            {/* ✅ Trade Table */}
            <div className={styles.tableWrapper}>
              <table
                className={styles.tradeTable}
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "'ABeeZee', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["ID", "Date", "Pair", "Profit", "Loss"].map(
                      (header) => (
                        <th
                          key={header}
                          style={{
                            padding: "12px 15px",
                            textAlign: "left",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#fff",
                          }}
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {trades.map((data, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "15px 20px",
                          fontSize: "16px",
                          textAlign: "left",
                        }}
                      >
                        {index + 1}
                      </td>

                      <td
                        style={{
                          padding: "15px 20px",
                          fontSize: "16px",
                          textAlign: "left",
                        }}
                      >
                        {data?.date ?? "---"}
                      </td>

                      <td
                        style={{
                          padding: "15px 20px",
                          fontSize: "16px",
                          textAlign: "left",
                        }}
                      >
                        {data?.pair ?? "---"}
                      </td>

                      <td
                        style={{
                          padding: "15px 20px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#10B981",
                          textAlign: "left",
                        }}
                      >
                        {formatCurrency(data?.profit)}
                      </td>

                      <td
                        style={{
                          padding: "15px 20px",
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#EF4444",
                          textAlign: "left",
                        }}
                      >
                        {formatCurrency(data?.loss)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {trades.length === 0 && (
              <div className={styles.historyCard}>
                <h3 className={styles.sectionTitle}>My Trades</h3>
                <p className={styles.emptyText}>No Trade found.</p>
              </div>
            )}
          </div>
        </>
      )}

      <div
        className={styles.tradeSummaryCard}
        style={{
          background: "transparent",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MultiCoinChart />
      </div>
    </div>
  </div>
  </>
  );
};

export default TradeCenter;


