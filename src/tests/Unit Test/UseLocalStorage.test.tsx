import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import useLocalStorage from '../../hooks/useLocalStorage.tsx';

describe('useLocalStorage Hook', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  it('should set and get a value from localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorageMock.getItem('testKey')).toBe(
      JSON.stringify('new value'),
    );
  });

  it('should handle errors and return initialValue on error', () => {
    const originalJSONParse = JSON.parse;
    JSON.parse = () => {
      throw new Error('Parse error');
    };

    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');

    JSON.parse = originalJSONParse;
  });

  it('should handle function as value and update localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'initialValue'),
    );

    act(() => {
      result.current[1]((prevValue) => `${prevValue} updated`);
    });

    expect(result.current[0]).toBe('initialValue updated');
    expect(localStorageMock.getItem('testKey')).toBe(
      JSON.stringify('initialValue updated'),
    );
  });

  it('should clear the value from localStorage when setting to null', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>('testKey', 'initialValue'),
    );

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBeNull();
    expect(localStorageMock.getItem('testKey')).toBe('null');
  });
});
