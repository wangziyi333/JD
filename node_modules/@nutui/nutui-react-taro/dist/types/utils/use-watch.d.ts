type Callback<T> = (prev: T | undefined) => void;
type Config = {
    immediate: boolean;
};
declare function useWatch<T>(dep: T, callback: Callback<T>, config?: Config): () => void;
export default useWatch;
