const operatorRx = (n: number, func) => <T>(source: Observable<T>) =>
    new Observable<T>(observer => {
    return source.subscribe({
        next(x) {
            let res = func(x)
            observer.next(res);
        },
        error(err) { observer.error(err); },
        complete() { observer.complete(); }
    })
});

export default operatorRx
