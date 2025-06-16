import { getUserIdCSR } from '../../utils/getUserIdCSR';

describe('getUserIdCSR', () => {
  afterEach(() => {
    // Limpia las cookies después de cada test
    document.cookie = 'usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('debe devolver el id del usuario si la cookie existe y es válida', () => {
    const user = { id: 123, nombre: 'Facundo' };
    document.cookie = `usuario=${encodeURIComponent(JSON.stringify(user))}`;
    expect(getUserIdCSR()).toBe(123);
  });

  it('debe devolver null si la cookie usuario no existe', () => {
    document.cookie = 'otraCookie=valor';
    expect(getUserIdCSR()).toBeNull();
  });

  it('debe manejar múltiples cookies y extraer la correcta', () => {
    document.cookie = 'foo=bar';
    const user = { id: 456 };
    document.cookie = `usuario=${encodeURIComponent(JSON.stringify(user))}`;
    document.cookie = 'baz=qux';
    expect(getUserIdCSR()).toBe(456);
  });
});
