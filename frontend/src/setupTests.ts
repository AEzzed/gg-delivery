import '@testing-library/jest-dom';

// Полифил для TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as any;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as any;
} 