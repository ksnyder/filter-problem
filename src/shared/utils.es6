export function getCountryName(countryCode) {
    const country = window.geoLookup[countryCode]
    if (country) {
        return window.geoLookup[countryCode]['name']
    } else {
        return `no country code '${countryCode}'`
    }
}

export function getRegionName(countryCode, regionCode) {
    return window.geoLookup[countryCode]['regions'][regionCode]
}