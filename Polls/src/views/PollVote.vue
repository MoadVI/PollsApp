<template>
    <div class="vote">
        <h1>{{ pollQuestion }}</h1>

        <div v-for="(option, index) in pollOptions" :key="index" class="option">
            <label class="option-label">
                <input 
                    type="checkbox" 
                    :value="option.name" 
                    v-model="selectedOptions"
                />
                {{ option.name }}
            </label>
        </div>

        <div class="btn">
            <button @click="submitVotes" class="submit">Submit</button>
            <router-link :to="`/result/${pollId}`" class="results-page">View Results</router-link>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    name: "PollVote",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const pollQuestion = ref("");
        const pollOptions = ref([]);
        const selectedOptions = ref([]);
        const pollId = ref(0);

        onMounted(async () => {
            const response = await fetch(`http://localhost:5000/polls/${route.params.id}`);
            const poll = await response.json();
            
            pollId.value = poll.id;
            pollQuestion.value = poll.question;
            pollOptions.value = poll.options;
        });

        const submitVotes = async () => {
        
            const pollResponse = await fetch(`http://localhost:5000/polls/${route.params.id}`);
            const poll = await pollResponse.json();

            poll.options.forEach(option => {
            if (selectedOptions.value.includes(option.name)) {
                option.votes += 1; 
            }
            });

            await fetch(`http://localhost:5000/polls/${route.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(poll),  
            });

            router.push(`/result/${pollId.value}`);

};

        return {
            pollQuestion,
            pollOptions,
            pollId,
            selectedOptions,
            submitVotes,
        };
    },
};
</script>


<style scoped>
.vote {
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

.option {
    margin: 2vh 0;
    transition: all 0.3s ease;
}

.option:hover {
    transform: translateX(2vh);

}

.option-label {
    display: flex;
    align-items: center;
    font-size: 2.3vh;
    color: white;
    list-style: none;
    padding: 2vh 3vh;
    margin: 1.5vh 0;
    background-color: #2d2d2d;
    border-radius: 1.5vh;
    font-size: 2.3vh;
    cursor: pointer;
    font-weight: bold;

}

.option-label:hover {
    background-color: #383838;
}

input[type="checkbox"] {
    margin-right: 1.5vh; 
    transform: scale(1.2); 
    -webkit-appearance: none; 
    appearance: none; 
    width: 2.5vh;
    height: 2.5vh;
    background-color: #232121; 
    border-radius: 0.5vh;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
}

input[type="checkbox"]:checked {
    background-color: #4f4949;
}

input[type="checkbox"]:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
}

input[type="checkbox"]:checked:before {
    opacity: 1;
}

.btn {
    display: flex;
    gap: 2vh;
    justify-content: flex-start;
}

.submit {
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

.results-page {
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

.submit:hover {
    background-color: #742bf3;
}

.results-page:hover {
    background-color: #757575;
}
</style>
