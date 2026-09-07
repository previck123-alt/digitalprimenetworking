import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { QRCodeCanvas } from "qrcode.react";

export const BitcoinPaymentModal = ({
  modalVisible,
  updateVisibility,
  btcAddress,
  amount,
  user,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(true);

  // ============================
  // CURRENCY MAP
  // ============================
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

  // ============================
  // DETERMINE USER CURRENCY
  // ============================
  const currencyCode =
    currencyMap[user?.country?.toUpperCase()] || "USD";

  // ============================
  // FORMAT CURRENCY
  // ============================
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(Number(value || 0));
  };

  if (!modalVisible) return null;

  const copyToClipboard = () => {
    const value =
      btcAddress.name === "Bank"
        ? btcAddress.accountNumber
        : btcAddress.address;

    navigator.clipboard.writeText(value || "");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.modalBackground}>
      {btcAddress.name === "Bank" ? (
        <div className={styles.modalView}>
          <span
            className="material-icons"
            style={{
              width: "100%",
              textAlign: "start",
              cursor: "pointer",
            }}
            onClick={updateVisibility}
          >
            close
          </span>

          <p className={styles.modalState}>
            Please transfer{" "}
            <strong>{formatCurrency(amount)}</strong> to the bank account
            below.
          </p>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "18px",
              marginTop: "15px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <strong>Bank Name</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.nameOfBank}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Account Name</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.nameOfAccount}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Account Number</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#16a34a",
                  fontWeight: "bold",
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                {btcAddress.accountNumber}
              </div>
            </div>

            <div>
              <strong>Branch Code</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.branchCode}
              </div>
            </div>
          </div>

          <div
            className={styles.modalButtonContainer}
            style={{ marginTop: "20px" }}
          >
            <button
              className={styles.acceptBtn}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy Account Number"}
            </button>
          </div>

          <p
            style={{
              marginTop: "18px",
              color: "#dc2626",
              fontWeight: "600",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            After completing your transfer, return to your deposit history and
            wait for the administrator to verify your payment.
          </p>
        </div>
      ) : (
        <div className={styles.modalView}>
          <span
            className="material-icons"
            style={{
              width: "100%",
              textAlign: "start",
              cursor: "pointer",
            }}
            onClick={updateVisibility}
          >
            close
          </span>

          <p className={styles.modalState}>
            Please send{" "}
            <strong>{formatCurrency(amount)}</strong> worth of{" "}
            <strong>{btcAddress.name}</strong> to the address below:
          </p>

          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              wordBreak: "break-all",
              marginBottom: "10px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "green",
              background: "#f4f4f4",
            }}
          >
            {btcAddress.address}
          </div>

          <div className={styles.modalButtonContainer}>
            <button
              className={styles.acceptBtn}
              style={{ marginBottom: "10px" }}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>

            <button
              className={styles.acceptBtn}
              style={{ marginBottom: "10px" }}
              onClick={() => setShowQR((prev) => !prev)}
            >
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </button>
          </div>

          {showQR && (
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <QRCodeCanvas
                value={btcAddress.address}
                size={200}
              />

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                }}
              >
                Scan with your wallet app
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};