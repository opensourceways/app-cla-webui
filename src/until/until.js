export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box,inner) => {
    this.$nextTick(() => {
        document.getElementById(box).style.minHeight = document.getElementById(inner).clientHeight * 2 + 'px'
    })

};

