import React, { useState, useEffect } from 'react'
import dayjs from "dayjs"

function date2local(pastDate) {
    var utc = require('dayjs/plugin/utc')
    dayjs.extend(utc)
    var localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)
    const result = dayjs(pastDate).utc('z').format('lll')
    return result
}

function getElapsedTime(pastDate) {
    var utc = require('dayjs/plugin/utc')
    dayjs.extend(utc)
    var customParseFormat = require('dayjs/plugin/customParseFormat')
    dayjs.extend(customParseFormat)
    const date1 = dayjs(new Date())
    const date2 = dayjs(pastDate).utc('z')

    let [years, months, days] = ["", "", ""];

    if (date1.diff(date2, 'year') > 0) {
        years = `${date1.diff(date2, 'year')}y`;
    }
    if (date1.diff(date2, 'month') > 0) {
        months = `${date1.diff(date2, 'month') % 24}m`;
    }
    if (date1.diff(date2, 'day') > 0 && date1.diff(date2, 'year') == 0) {
        days = `${date1.diff(date2, 'day') % 365}d`;
    }

    let response = [years, months, days].filter(Boolean);

    switch (response.length) {
        case 3:
            response[1] += "";
            response[0] += ",";
            break;
        case 2:
            response[0] += "";
            break;
    }
    return response.join(" ");
}

function setLocalStorage(key, json = false, value = 0) {
    if (typeof window !== 'undefined') {
        if (json)
            window.localStorage.setItem(key, JSON.stringify(value))
        else
            window.localStorage.setItem(key, value)
    }
}

function getLocalStorage(key, json = false, defaultValue = 0) {
    let value = null
    if (typeof window !== 'undefined') {
        const result = window.localStorage.getItem(key)
        if (result == null) {
            if (json) {
                value = JSON.stringify(defaultValue)
                setLocalStorage(key, true, defaultValue)
            }
            else {
                value = defaultValue
                setLocalStorage(key, false, defaultValue)
            }
        }
        else {
            value = result
        }
    } else
        value = defaultValue
    return value
}

export {
    getElapsedTime,
    date2local,
    getLocalStorage,
    setLocalStorage,
}