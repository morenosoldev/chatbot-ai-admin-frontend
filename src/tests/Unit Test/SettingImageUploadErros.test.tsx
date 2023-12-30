import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import Settings from '../../pages/Settings.tsx';


describe('Settings Image Upload', () => {

    test('allows a correct image to be uploaded', async () => {

        Object.defineProperty(global, 'Image', {
            writable: true,
            value: class MockImage {
                _src: any;
                onload(): void {
                    throw new Error('Method not implemented.');
                }
                set src(value: any) {
                    this._src = value;
                    setTimeout(() => this.onload());
                }
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </Provider>
        );

        const fileInput = screen.getByTestId('file-input');
        const correctImage = new File(['(⌐□_□)'], 'CorrectImage.png', { type: 'image/png' });
        Object.defineProperty(Image.prototype, 'width', { value: 799 });
        Object.defineProperty(Image.prototype, 'height', { value: 799 });
        fireEvent.change(fileInput, { target: { files: [correctImage] } });

        await waitFor(() => {
            expect(screen.queryByTestId('file-upload-error-message')).toBeNull();
        });
    });

    test('displays an error message for image with wrong format', async () => {

        Object.defineProperty(global, 'Image', {
            writable: true,
            value: class MockImage {
                _src: any;
                onload(): void {
                    throw new Error('Method not implemented.');
                }
                set src(value: any) {
                    this._src = value;
                    setTimeout(() => this.onload());
                }
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </Provider>
        );

        const fileInput = screen.getByTestId('file-input');
        const wrongFormatImage = new File(['(⌐□_□)'], 'WrongFormat.webp', { type: 'image/webp' });
        Object.defineProperty(Image.prototype, 'width', { value: 799 });
        Object.defineProperty(Image.prototype, 'height', { value: 799 });
        fireEvent.change(fileInput, { target: { files: [wrongFormatImage] } });

        await waitFor(() => {
            expect(screen.getByText(/Unsupported file format. Please upload a JPG, PNG, GIF, or SVG./i)).toBeInTheDocument();
        });
    });

    test('displays an error message for image with wrong resolution', async () => {

        Object.defineProperty(global, 'Image', {
            writable: true,
            value: class MockImage {
                _src: any;
                onload(): void {
                    throw new Error('Method not implemented.');
                }
                set src(value: any) {
                    this._src = value;
                    setTimeout(() => this.onload());
                }
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </Provider>
        );

        const fileInput = screen.getByTestId('file-input');
        const wrongResImage = new File(['(⌐□_□)'], 'WrongRes.png', { type: 'image/png' });
        Object.defineProperty(Image.prototype, 'width', { value: 801 });
        Object.defineProperty(Image.prototype, 'height', { value: 801 });
        fireEvent.change(fileInput, { target: { files: [wrongResImage] } });

        await waitFor(() => {
            expect(screen.getByText(/Image resolution is too high. Maximum allowed is 800x800px./i)).toBeInTheDocument();
        });
    });

    test('displays an error message for image with both wrong format and resolution', async () => {
        
        Object.defineProperty(global, 'Image', {
            writable: true,
            value: class MockImage {
                _src: any;
                onload(): void {
                    throw new Error('Method not implemented.');
                }
                set src(value: any) {
                    this._src = value;
                    setTimeout(() => this.onload());
                }
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Settings />
                </BrowserRouter>
            </Provider>
        );

        const fileInput = screen.getByTestId('file-input');
        const wrongResAndFormatImage = new File(['(⌐□_□)'], 'WrongResAndFormat.webp', { type: 'image/webp' });
        Object.defineProperty(Image.prototype, 'width', { value: 801 });
        Object.defineProperty(Image.prototype, 'height', { value: 801 });

        fireEvent.change(fileInput, { target: { files: [wrongResAndFormatImage] } });

        await waitFor(() => {
            expect(screen.getByText(/Unsupported file format and resolution too high. Please upload a JPG, PNG, GIF, or SVG with a maximum resolution of 800x800px./i)).toBeInTheDocument();
        });
    });
});
