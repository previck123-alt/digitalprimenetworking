import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Spinner } from "react-activity";

import styles from "./Withdraw.module.css";

import Sidebar from "../components/MobileSideBar";
import DesktopSideBar from "../components/DesktopSideBar";
import BackHeader from "../components/DashboardHeader";
import AuthModal from "../Modal/AuthModal";
import KycWarningCard from "../components/Kyc";
import MultiCoinChart from "./Chart";

import {
  createWithdraw,
  fetchWithdraw,
} from "../store/action/appStorage";

const Withdraw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userAuth);

  const currencyMap = {
    US: "USD",
    USA: "USD",
    "UNITED STATES": "USD",

    CA: "CAD",
    CANADA: "CAD",

    MX: "MXN",
    MEXICO: "MXN",

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

    CN: "CNY",
    CHINA: "CNY",

    JP: "JPY",
    JAPAN: "JPY",

    KR: "KRW",
    "SOUTH KOREA": "KRW",

    IN: "INR",
    INDIA: "INR",

    PK: "PKR",
    PAKISTAN: "PKR",

    BD: "BDT",
    BANGLADESH: "BDT",

    LK: "LKR",
    "SRI LANKA": "LKR",

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

    AU: "AUD",
    AUSTRALIA: "AUD",

    NZ: "NZD",
    "NEW ZEALAND": "NZD",
  };

  const [country, setCountry] = useState(user?.country || "");

  const currencyCode = useMemo(() => {
    return (
      currencyMap[(country || "").trim().toUpperCase()] ||
      currencyMap[(user?.country || "").trim().toUpperCase()] ||
      "USD"
    );
  }, [country, user]);

  const [currency, setCurrency] = useState(currencyCode);

  useEffect(() => {
    setCurrency(currencyCode);
  }, [currencyCode]);

  const [loading, setLoading] = useState(false);
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

  const [withdrawModal, setWithdrawModal] = useState({
  open: false,
  progress: 25,
  title: "",
  label: "",
  placeholder: "",
  value: "",
  error: "",
  codeType: "",
  });



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount || 0));
  };



  const openMobileMenu = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchCryptoData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );

        if (!res.ok) {
          throw new Error("Unable to fetch cryptocurrency prices.");
        }

        const data = await res.json();

        setCryptoData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCryptoData([]);
      }
    };

    fetchCryptoData();
  }, []);

  const fetchWithdrawHandler = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await dispatch(fetchWithdraw({ user }));

      if (!res?.bool) {
        setWithdrawals([]);
        setAuthInfo(res?.message || "Failed to fetch withdrawals.");
        setIsAuthError(true);
        return;
      }

      setWithdrawals(
        Array.isArray(res.message) ? res.message : []
      );
    } catch (error) {
      console.error(error);

      setWithdrawals([]);
      setAuthInfo(
        error?.message || "Something went wrong."
      );
      setIsAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWithdrawHandler();
    } else {
      setLoading(false);
    }
  }, [user]);

  const clearWithdrawForm = () => {
    setAmount("");
    setMethod("");

    setAccountName("");
    setAccountNumber("");
    setBankName("");

    setBitcoinAddress("");
    setEtheriumAddress("");
    setCashappAddress("");
    setZelleAddress("");

    setRoutingNumber("");
    setSortCode("");
    setIban("");
    setSwift("");
    setBic("");
    setTransitNumber("");
    setInstitutionNumber("");
    setBsb("");
    setBankBranch("");
    setBankAddress("");
  };

  const handleWithdraw = async () => {
    if (loading) return;

    if (!amount) {
      setAuthInfo("Please enter an amount.");
      setIsAuthError(true);
      return;
    }

    if (Number(amount) <= 0) {
      setAuthInfo("Amount must be greater than zero.");
      setIsAuthError(true);
      return;
    }

    if (!method) {
      setAuthInfo("Please select a withdrawal method.");
      setIsAuthError(true);
      return;
    }

    if (!user) {
      setAuthInfo("Unable to locate user.");
      setIsAuthError(true);
      return;
    }

    if (!user?.accountStatus) {
      setAuthInfo("Account not yet verified.");
      setIsAuthError(true);
      return;
    }

    if (
      Number(user?.availableBalance || 0) <
      Number(amount)
    ) {
      setAuthInfo("Insufficient balance.");
      setIsAuthError(true);
      return;
    }

    if (method === "bank") {
      if (
        !accountName ||
        !bankName ||
        !accountNumber ||
        !country
      ) {
        setAuthInfo(
          "Please complete all required bank information."
        );
        setIsAuthError(true);
        return;
      }
    }

    if (method === "bitcoin" && !bitcoinAddress.trim()) {
      setAuthInfo("Please enter your Bitcoin address.");
      setIsAuthError(true);
      return;
    }

    if (
      method === "etherium" &&
      !etheriumAddress.trim()
    ) {
      setAuthInfo("Please enter your Ethereum address.");
      setIsAuthError(true);
      return;
    }

    if (method === "cashapp" && !cashappAddress.trim()) {
      setAuthInfo("Please enter your CashApp username.");
      setIsAuthError(true);
      return;
    }

    if (method === "zelle" && !zelleAddress.trim()) {
      setAuthInfo("Please enter your Zelle details.");
      setIsAuthError(true);
      return;
    }


    if (!user?.otpVerified) {
      return setWithdrawModal({
        open: true,
        progress: 25,
        title: "Use the otp Code given to you to proceed",
        label: "otp Code",
        placeholder: "Enter otp Code",
        value: "",
        codeType: 'otp',
      });
    }

    if (!user?.taxVerified) {
      return setWithdrawModal({
        open: true,
        progress: 50,
        title: "Enter your tax Code to continue",
        label: "tax Code",
        placeholder: "Enter tax Code",
        value: "",
        codeType: 'tax',
      });
    }

    const payload = {
      amount: Number(amount),
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

      const res = await dispatch(
        createWithdraw(payload)
      );

      if (!res?.bool) {
        setAuthInfo(
          res?.message || "Withdrawal failed."
        );
        setIsAuthError(true);
        return;
      }

      setAuthInfo("Withdrawal initiated successfully.");
      setIsAuthError(true);

      await fetchWithdrawHandler();

      clearWithdrawForm();
    } catch (error) {
      console.error(error);

      setAuthInfo(
        error?.message || "Something went wrong."
      );
      setIsAuthError(true);
    } finally {
      setLoading(false);
    }
  };


   const codeHandler = async () => {
    const enteredCode = withdrawModal.value?.trim();

    if (!enteredCode) {
      return setWithdrawModal(prev => ({
        ...prev,
        error: "Please enter a code"
      }));
    }



    // IMF CODE
    if (withdrawModal.codeType === "tax") {
      if (enteredCode !== user?.tax) {
        return setWithdrawModal(prev => ({
          ...prev,
          error: "Invalid tax Code"
        }));
      }

      // update redux user state
      dispatch({
        type: "UPDATE_USER",
        payload: {
          ...user,
          taxVerified: true
        }
      });

      setWithdrawModal({
        open: true,
        progress: 50,
        title: "Enter your Tax Code to continue",
        label: "Tax Code",
        placeholder: "Enter Task Code",
        value: "",
        error: "",
        codeType: "tax"
      });

      return;
    }

    // TASK CODE
    if (withdrawModal.codeType === "otp") {
      if (enteredCode !== user?.otp) {
        return setWithdrawModal(prev => ({
          ...prev,
          error: "Invalid otp Code"
        }));
      }

      dispatch({
        type: "UPDATE_USER",
        payload: {
          ...user,
          otpVerified: true
        }
      });

      setWithdrawModal(prev => ({
        ...prev,
        open: false,
        error: "",
        value: ""
      }));

      setAuthInfo("Otp Code verified successfully");
      setIsAuthError(true);
      return;
    }

  };

  

  const updateAuthError = () => {
    setIsAuthError(false);
    setAuthInfo("");
  };

  const navigateMobileHandler = (url) => {
    navigate(`/${url}`);
  };

  const notificationHandler = () => {
    navigate("/notifications");
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
            title="Withdraw Fund"
          />

          <div
            className={styles.tickerTape}
            style={{ margin: "0 10px" }}
          >
            <div className={styles.tickerInner}>
              {(cryptoData || []).map((coin, index) => (
                <div
                  key={coin?.id || index}
                  className={styles.tickerItem}
                >
                  <img
                    src={coin?.image || ""}
                    alt={coin?.name || "coin"}
                    className={styles.coinIcon}
                  />

                  <span className={styles.coinName}>
                    {(coin?.symbol || "").toUpperCase()}
                  </span>

                  <span
                    className={
                      (coin?.price_change_percentage_24h || 0) >= 0
                        ? styles.priceUp
                        : styles.priceDown
                    }
                  >
                    {formatCurrency(coin?.current_price)}

                    {" ("}

                    {(coin?.price_change_percentage_24h || 0).toFixed(
                      2
                    )}
                    %

                    {")"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!loading ? (
            <div className={styles.container}>
              {!user?.accountStatus && (
                <KycWarningCard />
              )}

              <div className={styles.card}>
                <div className={styles.formGroup}>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className={styles.input}
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <select
                    className={styles.select}
                    value={method}
                    onChange={(e) =>
                      setMethod(e.target.value)
                    }
                  >
                    <option value="">
                      Receive Payment through
                    </option>

                    <option value="bank">
                      Bank
                    </option>

                    <option value="bitcoin">
                      Bitcoin
                    </option>

                    <option value="etherium">
                      Ethereum
                    </option>

                    <option value="cashapp">
                      CashApp
                    </option>

                    <option value="zelle">
                      Zelle
                    </option>
                  </select>
                </div>

                {method === "bank" && (
                  <>
                    <div className={styles.formGroup}>
                      <input
                        placeholder="Account Holder Name"
                        className={styles.input}
                        value={accountName}
                        onChange={(e) =>
                          setAccountName(e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        placeholder="Bank Name"
                        className={styles.input}
                        value={bankName}
                        onChange={(e) =>
                          setBankName(e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        placeholder="Account Number"
                        className={styles.input}
                        value={accountNumber}
                        onChange={(e) =>
                          setAccountNumber(e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        placeholder="Country"
                        className={styles.input}
                        value={country}
                        onChange={(e) =>
                          setCountry(e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        placeholder="Currency"
                        className={styles.input}
                        value={currency}
                        readOnly
                      />
                    </div>

                    {(country || "")
                      .toLowerCase()
                      .includes("united states") ||
                    (country || "")
                      .toLowerCase() === "usa" ? (
                      <div className={styles.formGroup}>
                        <input
                          placeholder="Routing Number"
                          className={styles.input}
                          value={routingNumber}
                          onChange={(e) =>
                            setRoutingNumber(
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ) : null}

                    {(country || "")
                      .toLowerCase()
                      .includes("united kingdom") ||
                    (country || "")
                      .toLowerCase() === "uk" ? (
                      <div className={styles.formGroup}>
                        <input
                          placeholder="Sort Code"
                          className={styles.input}
                          value={sortCode}
                          onChange={(e) =>
                            setSortCode(
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ) : null}

                    {[
                      "france",
                      "germany",
                      "italy",
                      "spain",
                      "portugal",
                      "netherlands",
                      "belgium",
                      "ireland",
                    ].includes(
                      (country || "").toLowerCase()
                    ) && (
                      <>
                        <div className={styles.formGroup}>
                          <input
                            placeholder="IBAN"
                            className={styles.input}
                            value={iban}
                            onChange={(e) =>
                              setIban(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <input
                            placeholder="SWIFT / BIC"
                            className={styles.input}
                            value={swift}
                            onChange={(e) =>
                              setSwift(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {country.toLowerCase() ===
                      "canada" && (
                      <>
                        <div className={styles.formGroup}>
                          <input
                            placeholder="Transit Number"
                            className={styles.input}
                            value={transitNumber}
                            onChange={(e) =>
                              setTransitNumber(
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <input
                            placeholder="Institution Number"
                            className={styles.input}
                            value={institutionNumber}
                            onChange={(e) =>
                              setInstitutionNumber(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </>
                    )}

                    {country.toLowerCase() ===
                      "australia" && (
                      <div className={styles.formGroup}>
                        <input
                          placeholder="BSB Number"
                          className={styles.input}
                          value={bsb}
                          onChange={(e) =>
                            setBsb(e.target.value)
                          }
                        />
                      </div>
                    )}

                                        <div className={styles.formGroup}>
                      <input
                        placeholder="Bank Branch (Optional)"
                        className={styles.input}
                        value={bankBranch}
                        onChange={(e) =>
                          setBankBranch(e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        placeholder="Bank Address (Optional)"
                        className={styles.input}
                        value={bankAddress}
                        onChange={(e) =>
                          setBankAddress(e.target.value)
                        }
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
                      onChange={(e) =>
                        setBitcoinAddress(e.target.value)
                      }
                    />
                  </div>
                )}

                {method === "etherium" && (
                  <div className={styles.formGroup}>
                    <input
                      placeholder="Ethereum Address"
                      className={styles.input}
                      value={etheriumAddress}
                      onChange={(e) =>
                        setEtheriumAddress(e.target.value)
                      }
                    />
                  </div>
                )}

                {method === "cashapp" && (
                  <div className={styles.formGroup}>
                    <input
                      placeholder="CashApp Username"
                      className={styles.input}
                      value={cashappAddress}
                      onChange={(e) =>
                        setCashappAddress(e.target.value)
                      }
                    />
                  </div>
                )}

                {method === "zelle" && (
                  <div className={styles.formGroup}>
                    <input
                      placeholder="Zelle Email or Phone"
                      className={styles.input}
                      value={zelleAddress}
                      onChange={(e) =>
                        setZelleAddress(e.target.value)
                      }
                    />
                  </div>
                )}

                <button
                  className={styles.button}
                  onClick={handleWithdraw}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Withdraw"}
                </button>
              </div>

              <div className={styles.historyCard}>
                <h3 className={styles.sectionTitle}>
                  Withdrawal History
                </h3>

                {!withdrawals?.length ? (
                  <p className={styles.emptyText}>
                    No withdrawals found.
                  </p>
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
                        {withdrawals.map((item, index) => (
                          <tr key={item?._id || index}>
                            <td>#{index + 1}</td>

                            <td>
                              {item?.date
                                ? new Date(
                                    item.date
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>

                            <td>
                              {formatCurrency(
                                item?.amount || 0
                              )}
                            </td>

                            <td
                              style={{
                                color: "#10B981",
                                fontWeight: 600,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.method || "N/A"}
                            </td>

                            <td
                              style={{
                                color:
                                  item?.status?.toLowerCase() ===
                                  "pending"
                                    ? "#EF4444"
                                    : "#10B981",
                                fontWeight: 600,
                                textTransform: "capitalize",
                              }}
                            >
                              {item?.status?.toLowerCase() ===
                              "active"
                                ? "Successful"
                                : item?.status || "Pending"}
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
                minHeight: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner
                size={24}
                color="#4F46E5"
                speed={0.8}
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
              marginTop: 20,
            }}
          >
            <MultiCoinChart />
          </div>
        </div>
      </div>



      {withdrawModal.open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>

            <button
              className={styles.closeBtn}
              onClick={() =>
                setWithdrawModal(prev => ({
                  ...prev,
                  open: false
                }))
              }
            >
              ×
            </button>

            <div className={styles.withdrawIcon}>
              <FaArrowDown />
            </div>

            <h3 className={styles.withdrawTitle}>
              Withdrawal Is {withdrawModal.progress}% Complete
            </h3>

            <div className={styles.progressWrapper}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${withdrawModal.progress}%`
                }}
              />
            </div>

            <p className={styles.withdrawText}>
              {withdrawModal.title}
            </p>

            <div className={styles.inputGroup}>
              <label>
                {withdrawModal.label}
              </label>

              <input
                type="text"
                value={withdrawModal.value}
                placeholder={withdrawModal.placeholder}
                className={styles.withdrawInput}
                onChange={(e) =>
                  setWithdrawModal(prev => ({
                    ...prev,
                    value: e.target.value
                  }))
                }
              />
            </div>

            <button
              className={styles.proceedButton}
              onClick={codeHandler}
            >
              Proceed
            </button>
            <span style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>{withdrawModal.error}</span><br></br>

            <button className={styles.getCodeButton}>
              Get Code
            </button>



          </div>
        </div>
      )}
    </>
  );
};

export default Withdraw;