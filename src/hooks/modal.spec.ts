import { act, renderHook } from '@testing-library/react-hooks';
import { useModal } from 'app/src/hooks/modal';

describe("hooks/modal", () => {
    it("open", async () => {
        const { result } = renderHook(() => useModal());

        expect(result.current.isOpen).toBe(false);
        act(() => result.current.openModal());
        expect(result.current.isOpen).toBe(true);
    });

    it("close", async () => {
        const { result } = renderHook(() => useModal());

        act(() => result.current.openModal());
        expect(result.current.isOpen).toBe(true);
        act(() => result.current.closeModal());
        expect(result.current.isOpen).toBe(false);
    });
});