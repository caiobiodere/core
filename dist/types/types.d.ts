import { Observable, Subject } from 'rxjs';
export declare type ObservableMap<S> = {
    [K in keyof S]: Observable<S[K]>;
};
export declare type Action<T> = (_: T) => void;
export declare type ActionMap<A> = {
    [K in keyof A]: Action<A[K]>;
};
export declare type SubjectMap<A> = {
    [K in keyof A]: Subject<A[K]>;
};
export declare type Difference<A, Without> = Pick<A, Exclude<keyof A, keyof Without>>;
export interface ViewModel<S, A> {
    inputs?: ObservableMap<S> | Observable<S>;
    outputs?: SubjectMap<A>;
}
export declare type ViewModelFactory<S, A, P> = (ownProps: Observable<P>) => ViewModel<S, A>;
