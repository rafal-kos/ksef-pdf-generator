import { FP as FP2 } from '../../../lib-public/types/fa2.types';
import i18n from 'i18next';

export function translateMap(value: FP2 | string | undefined, map: Record<string, string>): string {
  let valueToTranslate = typeof value === 'string' ? value : value?._text;

  valueToTranslate = valueToTranslate?.trim();
  if (!valueToTranslate || !map[valueToTranslate]) {
    return '';
  }
  return i18n.t(map[valueToTranslate]);
}

export function formatDateTime(data?: string, withoutSeconds?: boolean, withoutTime?: boolean): string {
  if (!data) {
    return '';
  }
  const dateTime: Date = new Date(data);

  if (isNaN(dateTime.getTime())) {
    return data;
  }

  const year: number = dateTime.getFullYear();
  const month: string = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const day: string = dateTime.getDate().toString().padStart(2, '0');
  const hours: string = dateTime.getHours().toString().padStart(2, '0');
  const minutes: string = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds: string = dateTime.getSeconds().toString().padStart(2, '0');

  if (withoutTime) {
    return `${day}.${month}.${year}`;
  } else if (withoutSeconds) {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function formatDateTimePl(value: string, withTime?: boolean, withSeconds?: boolean): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  // ISO date-only strings (YYYY-MM-DD) are parsed as UTC midnight by JS engines.
  // Using UTC accessors prevents day-shift on servers whose local timezone is behind UTC.
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const year = isDateOnly ? date.getUTCFullYear() : date.getFullYear();
  const month = ((isDateOnly ? date.getUTCMonth() : date.getMonth()) + 1).toString().padStart(2, '0');
  const day = (isDateOnly ? date.getUTCDate() : date.getDate()).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  if (!withTime) {
    return `${day}.${month}.${year}`;
  } else if (!withSeconds) {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export function getDateTimeWithoutSeconds(isoDate?: FP2): string {
  if (!isoDate?._text) {
    return '';
  }
  return formatDateTimePl(isoDate._text, true);
}

export function formatTime(data?: string, withoutSeconds?: boolean): string {
  if (!data) {
    return '';
  }
  const dateTime: Date = new Date(data);

  if (isNaN(dateTime.getTime())) {
    return data;
  }

  const hours: string = dateTime.getHours().toString().padStart(2, '0');
  const minutes: string = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds: string = dateTime.getSeconds().toString().padStart(2, '0');

  if (withoutSeconds) {
    return `${hours}:${minutes}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}
