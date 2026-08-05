import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Withdraw.module.css';
import Sidebar from '../components/MobileSideBar';
import DesktopSideBar from '../components/DesktopSideBar';
import AuthModal from '../Modal/AuthModal';
import BackHeader from '../components/DashboardHeader';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-activity';
import { createWithdraw, fetchWithdraw } from '../store/action/appStorage';
import KycWarningCard from '../components/Kyc';
import MultiCoinChart from './Chart';

const Withdraw = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    "PAPUA NEW GUINEA": "PGK",
  };

  const [country, setCountry] = useState(user?.country || "");

  const [currency, setCurrency] = useState(
    currencyMap[(user?.country || "").toUpperCase()] || "USD"
  );

  const [loading, setLoading] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authInfo, setAuthInfo] = useState("");
  const [cryptoData, setCryptoData] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [etheriumAddress, setEtheriumAddress] = useState("");
  const [cashappAddress, setCashappAddress] = useState("");
  const [zelleAddress, setZelleAddress] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [routingNumber, setRoutingNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [iban, setIban] = useState("");
  const [swift, setSwift] = useState("");
  const [bic, setBic] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [institutionNumber, setInstitutionNumber] = useState("");
  const [bsb, setBsb] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankAddress, setBankAddress] = useState("");



  


const formatCurrency = (amount) =>{
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(Number(amount || 0));
}
  const navigate = useNavigate();

  const openMobileMenu = () => {
    setSidebarOpen(prev => !prev);
  };

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

  const handleWithdraw = async () => {
    if (loading) return;
    if (!amount || !method) {
      setAuthInfo('Please fill in required fields');
      setIsAuthError(true);
      return;
    }

    if (!user?.accountStatus) {
      setAuthInfo('Account not yet verified');
      setIsAuthError(true);
      return;
    }

    if (Number(user?.availableBalance ?? 0) < Number(amount)) {
      setAuthInfo('Insufficient fund');
      setIsAuthError(true);
      return;
    }



    const data = {
  amount,
  method,
  user,

  account_name: accountName,
  account_number: accountNumber,
  bank_name: bankName,
  country,
  currency,

  routing_number: routingNumber,
  sort_code: sortCode,
  iban,
  swift,
  bic,

  transit_number: transitNumber,
  institution_number: institutionNumber,
  bsb,

  bank_branch: bankBranch,
  bank_address: bankAddress,

  bitcoin_address: bitcoinAddress,
  etherium_address: etheriumAddress,
  cashapp_address: cashappAddress,
  zelle_address: zelleAddress,
};



    try {
      setLoading(true);
      const res = await dispatch(createWithdraw(data));
      if (!res?.bool) {
        setIsAuthError(true);
        return setAuthInfo(res?.message ?? 'Withdrawal failed');
      }

      setIsAuthError(true);
      setWithdrawals(res?.message ?? []);
      setAuthInfo("Withdrawal initiated.");
      setLoading(false);
      fetchWithdrawHandler();

      // ✅ Clear all input fields
      setAmount('');
      setMethod('');
      setAccountName('');
      setAccountNumber('');
      setBankName('');
      setBitcoinAddress('');
      setEtheriumAddress('');
      setCashappAddress('');
      setZelleAddress('');
    } catch (error) {
      setIsAuthError(true);
      setAuthInfo(error.message);
      setLoading(false);
    }
  };

  const fetchWithdrawHandler = async () => {
    try {
      setLoading(true);
      const res = await dispatch(fetchWithdraw({ user }));
      if (!res?.bool) {
        setAuthInfo(res?.message ?? 'Failed to fetch withdrawals');
        setIsAuthError(true);
        setLoading(false);
        return;
      }
      setWithdrawals(res?.message ?? []);
      setLoading(false);
    } catch (err) {
      setAuthInfo(err.message);
      setIsAuthError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawHandler();
  }, []);

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo('');
  };

  const navigateMobileHandler = (url) => {
    return navigate(`/${url}`);
  };

  const notificationHandler = () => {
    navigate('/notifications');
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

    {/* Sidebar content */}
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
        title="Withdraw Fund"
      />

      <div className={styles.tickerTape} style={{ margin: "0 10px" }}>
        <div className={styles.tickerInner}>
          {(cryptoData ?? []).map((coin, index) => (
            <div key={index} className={styles.tickerItem}>
              <img
                src={coin?.image ?? ""}
                alt={coin?.name ?? "coin"}
                className={styles.coinIcon}
              />
              <span className={styles.coinName}>
                {(coin?.symbol ?? "").toUpperCase()}
              </span>

              <span
                className={
                  (coin?.price_change_percentage_24h ?? 0) >= 0
                    ? styles.priceUp
                    : styles.priceDown
                }
              >
                {formatCurrency(coin?.current_price ?? 0)} (
                {(coin?.price_change_percentage_24h ?? 0).toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {!loading ? (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <input
                type="number"
                placeholder="Enter amount"
                className={styles.input}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <select
                className={styles.select}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="">Receive Payment through</option>
                <option value="bank">Bank</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="etherium">Ethereum</option>
                <option value="cashapp">CashApp</option>
                <option value="zelle">Zelle</option>
              </select>
            </div>

            {method === "bank" && (
  <>
    <div className={styles.formGroup}>
      <input
        placeholder="Account Holder Name"
        className={styles.input}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Bank Name"
        className={styles.input}
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Account Number"
        className={styles.input}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Country"
        className={styles.input}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Currency"
        className={styles.input}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
    </div>

    {/* USA */}
    {country.toLowerCase().includes("united states") ||
    country.toLowerCase() === "usa" ? (
      <div className={styles.formGroup}>
        <input
          placeholder="Routing Number"
          className={styles.input}
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
        />
      </div>
    ) : null}

    {/* UK */}
    {country.toLowerCase().includes("united kingdom") ||
    country.toLowerCase() === "uk" ? (
      <div className={styles.formGroup}>
        <input
          placeholder="Sort Code"
          className={styles.input}
          value={sortCode}
          onChange={(e) => setSortCode(e.target.value)}
        />
      </div>
    ) : null}

    {/* Europe */}
    {[
      "france",
      "germany",
      "italy",
      "spain",
      "portugal",
      "netherlands",
      "belgium",
      "ireland"
    ].includes(country.toLowerCase()) && (
      <>
        <div className={styles.formGroup}>
          <input
            placeholder="IBAN"
            className={styles.input}
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            placeholder="SWIFT / BIC"
            className={styles.input}
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
          />
        </div>
      </>
    )}

    {/* Canada */}
    {country.toLowerCase() === "canada" && (
      <>
        <div className={styles.formGroup}>
          <input
            placeholder="Transit Number"
            className={styles.input}
            value={transitNumber}
            onChange={(e) => setTransitNumber(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            placeholder="Institution Number"
            className={styles.input}
            value={institutionNumber}
            onChange={(e) => setInstitutionNumber(e.target.value)}
          />
        </div>
      </>
    )}

    {/* Australia */}
    {country.toLowerCase() === "australia" && (
      <div className={styles.formGroup}>
        <input
          placeholder="BSB Number"
          className={styles.input}
          value={bsb}
          onChange={(e) => setBsb(e.target.value)}
        />
      </div>
    )}

    {/* Optional international details */}
    <div className={styles.formGroup}>
      <input
        placeholder="Bank Branch (Optional)"
        className={styles.input}
        value={bankBranch}
        onChange={(e) => setBankBranch(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Bank Address (Optional)"
        className={styles.input}
        value={bankAddress}
        onChange={(e) => setBankAddress(e.target.value)}
      />
    </div>
  </>
)}

            {method === "bitcoin" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Bitcoin Address"
                  className={styles.input}
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                />
              </div>
            )}

            {method === "etherium" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Ethereum Address"
                  className={styles.input}
                  value={etheriumAddress}
                  onChange={(e) => setEtheriumAddress(e.target.value)}
                />
              </div>
            )}

            {method === "cashapp" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="CashApp Username"
                  className={styles.input}
                  value={cashappAddress}
                  onChange={(e) => setCashappAddress(e.target.value)}
                />
              </div>
            )}

            {method === "zelle" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Zelle Email or Phone"
                  className={styles.input}
                  value={zelleAddress}
                  onChange={(e) => setZelleAddress(e.target.value)}
                />
              </div>
            )}

            <button className={styles.button} onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>

          <div className={styles.historyCard}>
            <h3 className={styles.sectionTitle}>Withdraw history</h3>

            {(withdrawals ?? []).length === 0 ? (
              <p className={styles.emptyText}>No withdrawals found.</p>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.tradeTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(withdrawals ?? []).map((item, index) => (
                      <tr key={item?._id || index}>
                        <td>#{index + 1}</td>

                        <td>
                          {item?.date
                            ? new Date(item.date).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>{formatCurrency(item?.amount)}</td>

                        <td
                          style={{
                            color: "#10B981",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.method ?? "N/A"}
                        </td>

                        <td
                          style={{
                            color:
                              item?.status === "Pending"
                                ? "#EF4444"
                                : "#10B981",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.status === "active"
                            ? "successful"
                            : item?.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Spinner
            size={24}
            color="#4F46E5"
            speed={0.5}
            animating={true}
          />
        </div>
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

export default Withdraw;





  


const formatCurrency = (amount) =>{
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(Number(amount || 0));
}
  const navigate = useNavigate();

  const openMobileMenu = () => {
    setSidebarOpen(prev => !prev);
  };

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

  const handleWithdraw = async () => {
    if (loading) return;
    if (!amount || !method) {
      setAuthInfo('Please fill in required fields');
      setIsAuthError(true);
      return;
    }

    if (!user?.accountStatus) {
      setAuthInfo('Account not yet verified');
      setIsAuthError(true);
      return;
    }

    if (Number(user?.availableBalance ?? 0) < Number(amount)) {
      setAuthInfo('Insufficient fund');
      setIsAuthError(true);
      return;
    }



    const data = {
  amount,
  method,
  user,

  account_name: accountName,
  account_number: accountNumber,
  bank_name: bankName,
  country,
  currency,

  routing_number: routingNumber,
  sort_code: sortCode,
  iban,
  swift,
  bic,

  transit_number: transitNumber,
  institution_number: institutionNumber,
  bsb,

  bank_branch: bankBranch,
  bank_address: bankAddress,

  bitcoin_address: bitcoinAddress,
  etherium_address: etheriumAddress,
  cashapp_address: cashappAddress,
  zelle_address: zelleAddress,
};



    try {
      setLoading(true);
      const res = await dispatch(createWithdraw(data));
      if (!res?.bool) {
        setIsAuthError(true);
        return setAuthInfo(res?.message ?? 'Withdrawal failed');
      }

      setIsAuthError(true);
      setWithdrawals(res?.message ?? []);
      setAuthInfo("Withdrawal initiated.");
      setLoading(false);
      fetchWithdrawHandler();

      // ✅ Clear all input fields
      setAmount('');
      setMethod('');
      setAccountName('');
      setAccountNumber('');
      setBankName('');
      setBitcoinAddress('');
      setEtheriumAddress('');
      setCashappAddress('');
      setZelleAddress('');
    } catch (error) {
      setIsAuthError(true);
      setAuthInfo(error.message);
      setLoading(false);
    }
  };

  const fetchWithdrawHandler = async () => {
    try {
      setLoading(true);
      const res = await dispatch(fetchWithdraw({ user }));
      if (!res?.bool) {
        setAuthInfo(res?.message ?? 'Failed to fetch withdrawals');
        setIsAuthError(true);
        setLoading(false);
        return;
      }
      setWithdrawals(res?.message ?? []);
      setLoading(false);
    } catch (err) {
      setAuthInfo(err.message);
      setIsAuthError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawHandler();
  }, []);

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo('');
  };

  const navigateMobileHandler = (url) => {
    return navigate(`/${url}`);
  };

  const notificationHandler = () => {
    navigate('/notifications');
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

    {/* Sidebar content */}
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
        title="Withdraw Fund"
      />

      <div className={styles.tickerTape} style={{ margin: "0 10px" }}>
        <div className={styles.tickerInner}>
          {(cryptoData ?? []).map((coin, index) => (
            <div key={index} className={styles.tickerItem}>
              <img
                src={coin?.image ?? ""}
                alt={coin?.name ?? "coin"}
                className={styles.coinIcon}
              />
              <span className={styles.coinName}>
                {(coin?.symbol ?? "").toUpperCase()}
              </span>

              <span
                className={
                  (coin?.price_change_percentage_24h ?? 0) >= 0
                    ? styles.priceUp
                    : styles.priceDown
                }
              >
                {formatCurrency(coin?.current_price ?? 0)} (
                {(coin?.price_change_percentage_24h ?? 0).toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {!loading ? (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <input
                type="number"
                placeholder="Enter amount"
                className={styles.input}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <select
                className={styles.select}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="">Receive Payment through</option>
                <option value="bank">Bank</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="etherium">Ethereum</option>
                <option value="cashapp">CashApp</option>
                <option value="zelle">Zelle</option>
              </select>
            </div>

            {method === "bank" && (
  <>
    <div className={styles.formGroup}>
      <input
        placeholder="Account Holder Name"
        className={styles.input}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Bank Name"
        className={styles.input}
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Account Number"
        className={styles.input}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Country"
        className={styles.input}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Currency"
        className={styles.input}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
    </div>

    {/* USA */}
    {country.toLowerCase().includes("united states") ||
    country.toLowerCase() === "usa" ? (
      <div className={styles.formGroup}>
        <input
          placeholder="Routing Number"
          className={styles.input}
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
        />
      </div>
    ) : null}

    {/* UK */}
    {country.toLowerCase().includes("united kingdom") ||
    country.toLowerCase() === "uk" ? (
      <div className={styles.formGroup}>
        <input
          placeholder="Sort Code"
          className={styles.input}
          value={sortCode}
          onChange={(e) => setSortCode(e.target.value)}
        />
      </div>
    ) : null}

    {/* Europe */}
    {[
      "france",
      "germany",
      "italy",
      "spain",
      "portugal",
      "netherlands",
      "belgium",
      "ireland"
    ].includes(country.toLowerCase()) && (
      <>
        <div className={styles.formGroup}>
          <input
            placeholder="IBAN"
            className={styles.input}
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            placeholder="SWIFT / BIC"
            className={styles.input}
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
          />
        </div>
      </>
    )}

    {/* Canada */}
    {country.toLowerCase() === "canada" && (
      <>
        <div className={styles.formGroup}>
          <input
            placeholder="Transit Number"
            className={styles.input}
            value={transitNumber}
            onChange={(e) => setTransitNumber(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            placeholder="Institution Number"
            className={styles.input}
            value={institutionNumber}
            onChange={(e) => setInstitutionNumber(e.target.value)}
          />
        </div>
      </>
    )}

    {/* Australia */}
    {country.toLowerCase() === "australia" && (
      <div className={styles.formGroup}>
        <input
          placeholder="BSB Number"
          className={styles.input}
          value={bsb}
          onChange={(e) => setBsb(e.target.value)}
        />
      </div>
    )}

    {/* Optional international details */}
    <div className={styles.formGroup}>
      <input
        placeholder="Bank Branch (Optional)"
        className={styles.input}
        value={bankBranch}
        onChange={(e) => setBankBranch(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <input
        placeholder="Bank Address (Optional)"
        className={styles.input}
        value={bankAddress}
        onChange={(e) => setBankAddress(e.target.value)}
      />
    </div>
  </>
)}

            {method === "bitcoin" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Bitcoin Address"
                  className={styles.input}
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                />
              </div>
            )}

            {method === "etherium" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Ethereum Address"
                  className={styles.input}
                  value={etheriumAddress}
                  onChange={(e) => setEtheriumAddress(e.target.value)}
                />
              </div>
            )}

            {method === "cashapp" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="CashApp Username"
                  className={styles.input}
                  value={cashappAddress}
                  onChange={(e) => setCashappAddress(e.target.value)}
                />
              </div>
            )}

            {method === "zelle" && (
              <div className={styles.formGroup}>
                <input
                  placeholder="Zelle Email or Phone"
                  className={styles.input}
                  value={zelleAddress}
                  onChange={(e) => setZelleAddress(e.target.value)}
                />
              </div>
            )}

            <button className={styles.button} onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>

          <div className={styles.historyCard}>
            <h3 className={styles.sectionTitle}>Withdraw history</h3>

            {(withdrawals ?? []).length === 0 ? (
              <p className={styles.emptyText}>No withdrawals found.</p>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.tradeTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(withdrawals ?? []).map((item, index) => (
                      <tr key={item?._id || index}>
                        <td>#{index + 1}</td>

                        <td>
                          {item?.date
                            ? new Date(item.date).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>{formatCurrency(item?.amount)}</td>

                        <td
                          style={{
                            color: "#10B981",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.method ?? "N/A"}
                        </td>

                        <td
                          style={{
                            color:
                              item?.status === "Pending"
                                ? "#EF4444"
                                : "#10B981",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.status === "active"
                            ? "successful"
                            : item?.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Spinner
            size={24}
            color="#4F46E5"
            speed={0.5}
            animating={true}
          />
        </div>
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

export default Withdraw;

