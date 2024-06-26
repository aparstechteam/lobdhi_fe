<template>
    <div class="flex justify-between items-center border pt-10">
        <highcharts :options="chartOptions" :updateArgs="[true, true, true]" class="mx-auto w-full"></highcharts>
    </div>
</template>

<script setup>

const props = defineProps({
    dailyTransaction: Object
});

const data = computed(() => props.dailyTransaction.sort((b, a) => new Date(a._id).getTime() - new Date(b._id).getTime()));
const dates = computed(() => data.value.map(entry => entry._id));
const transactions = computed(() => data.value.map(entry => entry.total));

const chartOptions = ref({
    chart: {
        type: 'column',
        backgroundColor: '#fff',
        style: {
            fontFamily: 'Arial, sans-serif'
        }
    },
    title: {
        text: 'Daily Transactions',
        align: 'center',
        style: {
            color: '#333333',
            fontSize: '18px'
        }
    },
    xAxis: {
        categories: dates.value,
        title: {
            text: 'Date',
            style: {
                color: '#333333',
                fontSize: '14px'
            }
        },
        labels: {
            style: {
                color: '#333333'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Amount',
            style: {
                color: '#333333',
                fontSize: '14px'
            }
        },
        labels: {
            style: {
                color: '#333333'
            }
        },
        gridLineColor: '#e6e6e6'
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
            color: '#333333',
            fontSize: '12px'
        }
    },
    plotOptions: {
        column: {
            borderRadius: 5,
            pointPadding: 0.2,
            borderWidth: 0,
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#007bff'],
                    [1, '#00c6ff']
                ]
            }
        }
    },
    series: [{
        name: 'Amount',
        data: transactions.value
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 480
            },
            chartOptions: {
                chart: {
                    width: 200
                }
            }
        }]
    }
});
</script>

<style lang="scss" scoped></style>
