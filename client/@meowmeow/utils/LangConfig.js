import { IntlProvider } from 'react-intl';
import AppLocale from './i18n';
import { useSelector, useDispatch } from "react-redux";

export default function LangConfig({ children }) {
    const langCode = useSelector((langCode) => langCode.LangCode);
    // console.log("lang: "+langCode)
    switch (langCode) {
        case 1:
            var lang = AppLocale.en;
            break;
        case 2:
            var lang = AppLocale.vi;
            break;
        default:
            var lang = AppLocale.en;
    }
    return (
        <IntlProvider
            messages={lang.messages}
            locale={lang.locale}
        >
          {children}
        </IntlProvider>
    );
  }