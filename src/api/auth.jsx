export class Auth {
    keyLocalStorage = "datauser";
    
    async postSignin(
        formData
    ) {
        // const params = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData)
        // }

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD;
        const userData = JSON.parse(import.meta.env.VITE_USER_DATA || import.meta.env.USER_DATA);

        try {
            if (formData?.email !== adminEmail) return false;
            if (formData?.password !== adminPassword) return false;
            
            return userData;
        } catch (error) {
            return {msg: "Algo salio mal.", error: true, status: false};
        }
    }

    async setDataUser(dataUser) {
        dataUser = JSON.stringify(dataUser);
        localStorage.setItem(this.keyLocalStorage, dataUser);
    }

    async getDataUser() {
        return localStorage.getItem(this.keyLocalStorage);
    }

    async removeLogUser() {
        localStorage.removeItem(this.keyLocalStorage);
    }
}