import { useTranslation } from 'react-i18next'

function useRTL(){
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    return isRTL
}


export {
    useRTL
}