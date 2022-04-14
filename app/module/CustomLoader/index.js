var loaderRef = ''

const setLoaderRef = (ref) => {
    loaderRef = ref
}

const isShowLoader = (value) => {
    loaderRef.isShowLoader(value)
}


export default {
    setLoaderRef,
    isShowLoader
}