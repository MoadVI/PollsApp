<template>
    <div class="results">
        <h1>{{ pollQuestion }}</h1>
        <ul>
            <li v-for="(option, index) in pollOptions" :key="index">
                {{ option.name }}  <div id="percentage">{{ calculatePercentage(option.votes) }}%</div>
            </li>
        </ul>

        <div class="btn">
            <router-link :to="`/vote/${pollId}`" class="vote-section">Vote</router-link>
            <router-link to='/' class="back-button">Back</router-link>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "PollResult",
    setup() {
        const route = useRoute();
        const pollQuestion = ref("");
        const pollOptions = ref([]);
        const pollId = ref("");

        onMounted(async () => {

                const response = await fetch(`http://localhost:5000/polls/${route.params.id}`);
                const poll = await response.json();
                
                pollId.value = poll.id;
                pollQuestion.value = poll.question;
                pollOptions.value = poll.options;
        });

        const calculatePercentage = (votes) => {

            let totalVotes = 0;
            for (let i = 0; i < pollOptions.value.length; i++) {
                totalVotes += pollOptions.value[i].votes;
            }
            
            return totalVotes > 0 ? ((votes/totalVotes) * 100).toFixed(2) : 0;
        }

        return {
            pollQuestion,
            pollOptions,
            pollId,
            calculatePercentage,
        };
    },
};
</script>

<style scoped>

.results {
    max-width: 600px;
    width: 90%;
    margin: 5vh auto;
    padding: 4vh;
    border-radius: 3vh;
    background-color: #191919;
    box-shadow: 0 2vh 4vh rgba(0, 0, 0, 0.3);
}

h1 {
    background: linear-gradient(45deg, #282828, #484848);
    color: white;
    padding: 2vh;
    border-radius: 2vh;
    font-size: 3.5vh;
    margin: 0;
    text-align: center;
}

ul {
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    padding: 2vh 3vh;
    margin: 1.5vh 0;
    background-color: #2d2d2d;
    border-radius: 1.5vh;
    color: white;
    font-size: 2.3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

li:hover {
    transform: translateX(2vh);
    background-color: #383838;
}

.btn {
    display: flex;
    gap: 2vh;
    justify-content: flex-start;
}

.vote-section {
    padding: 1.5vh 3vh;
    background-color: #5900ff;
    color: white;
    border-radius: 1vh;
    text-decoration: none;
    font-size: 2.3vh;
    transition: background-color 0.3s;
    font-weight: bold;
    cursor: pointer;
}

.back-button {
    padding: 1.5vh 3vh;
    background-color: #343434;
    color: white;
    border-radius: 1vh;
    text-decoration: none;
    font-size: 2.3vh;
    transition: background-color 0.3s;
    font-weight: bold;
    cursor: pointer;
}

.vote-section:hover {
    background-color: #742bf3;
}

.back-button:hover {
    background-color: #757575;
}

#percentage {
    text-align: end;
    font-weight: bold;
    font-size: 4vh;
    color: aqua;
}

</style>
