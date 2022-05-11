import { useIntl } from 'react-intl';

const GetTranslateText = (textId) => {
  const intl18 = useIntl();
  const plainText = intl18.formatMessage({ id: textId });
  return plainText;
};

export default GetTranslateText