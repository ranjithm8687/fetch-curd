const requestApi = (url = "", optionsObj = null, errMsg = null) => {
    const fetchApi = async() => {
        try {
            const response = await fetch(url, optionsObj);
            if (!response.ok) throw Error("Please Reload the App");
        } catch (err) {
            errMsg = err.message;
        } finally {
            return errMsg;
        }
    };

    fetchApi();
};

export default requestApi;