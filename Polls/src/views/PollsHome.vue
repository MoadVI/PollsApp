<template>
    <div class="home-container">

        <div class="form-container">
            <form @submit.prevent="createPoll">
                <label>Type a poll question below</label>
                <input
                    type="text"
                    minlength="10"
                    placeholder="Enter a question"
                    class="poll-option"
                    v-model="pollQuestion"
                    required
                >
                <label>Enter as many poll choices as you like</label>
                <div class="options-container">
                    <input 
                        v-for="(option, index) in pollOptions"
                        :key="index"
                        v-model="pollOptions[index]"
                        type="text"
                        :placeholder="'Option ' + (index + 1)"
                        class="poll-option"
                        required
                    >
                </div>
                <div class="buttons">
                    <button type="submit" class="btn btn-create">Create this poll</button>
                    <button type="button" @click="addOption" class="btn btn-add">Add another option</button>
                </div>
            </form>
        </div>

        <div class="Polls">
            <div v-for="poll in polls_data" :key="poll.id">
                <router-link :to="`/result/${poll.id}`" id="link">
                    <div class="question">
                        {{ poll.question }}
                        <div class="participants">{{ total(poll) }} participants</div>
                    </div>

                </router-link>
            </div>  
        </div>

    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'PollsHome',
    setup() {
        
        const polls_data = ref([]);
        const pollQuestion = ref("");
        const pollOptions = ref(["", "", ""]);
        const router = useRouter();

        function addOption() {
            pollOptions.value.push("");
        }

        async function createPoll() {
            const newPoll = {
                question: pollQuestion.value,
                options: pollOptions.value.map(option => ({ name: option, votes: 0 }))
            };

            const response = await fetch("http://localhost:5000/polls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPoll)
            });

            const poll = await response.json();
            router.push(`/result/${poll.id}`);
        }

        const total = (poll) => {
            let totalVotes = 0;
            for (let i = 0; i < poll.options.length; i++) {
                totalVotes += poll.options[i].votes;
            }
            return totalVotes;
        }

        async function polls() {
            const response = await fetch("http://localhost:5000/polls");
            const data = await response.json();
            polls_data.value = data;
        }

        onMounted(() => {
            polls();
        });

        return {
            pollQuestion,
            pollOptions,
            addOption,
            createPoll,
            polls_data,
            total,
        };
    }
};
</script>

<style scoped>
.form-container {
    margin-left: 10vh;
    margin-top: 6vh;
    justify-content: center;
    display: flex;
}

form {
    display: flex;
    flex-direction: column;
    width: 80vh;
    background-color: rgb(0, 0, 0, 0.82);
    padding: 4vh;
    border-radius: 2vh;
}

label {
    margin-top: 2vh;
    margin-bottom: 2vh;
    text-align: start;
    color: white;
    font-weight: bold;
    font-size: 3.5vh;
}

.poll-option {
    color: white;
    background-color: black;
    border-radius: 1vh;
    margin-top: 1vh;
    padding: 2vh;
    font-weight: bold;
    font-size: 2vh;
}

.btn {
    width: 26vh;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
    margin: 0 5px;
    text-decoration: none;
    font-weight: bold;
}

.btn-create {
    background: #472C74;
    color: white;
}

.btn-create:hover {
    background: #5A3F91;
}

.btn-add {
    background: #2b2b2b;
    color: white;
}

.btn-add:hover {
    background: #222;
}

.buttons {
    margin-top: 2vh;
    display: flex;
    justify-content: space-evenly;
    background-color: rgb(0, 0, 0, 0.1);
}

.options-container {
    display: flex;
    flex-direction: column;
    max-height: 30vh;
    overflow-y: auto;
    border-radius: 1vh;
}

.question {
    flex-direction: column;
    color: #ffffff;
    width: 40vh;
    min-height: 15vh;
    background: linear-gradient(135deg, #000000, #434343);
    font-weight: bold;
    padding: 3vh;
    border-radius: 1.5vh;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    transition: transform 0.4s ease, box-shadow 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2.5vh;
}

.question:hover {
    transform: translateY(-8px) translateX(3px);
    box-shadow: 0 6px 15px rgba(255, 255, 255, 0.2);
    background: linear-gradient(75deg, rgb(55, 242, 255), rgb(67, 0, 190));
    font-weight: bold;
    border: 1px solid black;
}


.Polls {
    display: flex;
    flex-wrap: wrap;
    gap: 3vh;
    margin-top: 6vh;
    margin-left: 24vh;
    padding: 4vh;
    justify-content: flex-start;
}

#link {
    text-decoration: none;
}

.participants {
    margin-top: 5vh;
    color: white;
    font-size: 2vh;
    font-weight: bold;
}
</style>
