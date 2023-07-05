<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    export default {
        name: 'svg-icon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`;
            },
            svgClass() {
                if (this.className) {
                    return 'svg-icon ' + this.className;
                } else {
                    return 'svg-icon';
                }
            }
        }
    };
</script>

<style>
    .svg-icon {
        width: 1rem;
        height: 1rem; /*根据自己需要来*/
        vertical-align: -0.15rem;
        fill: currentColor;
        overflow: hidden;
    }
</style>
