<template>
<div>
    <h2>Contact Us</h2>
    <form>
        <div class="form-group">
            <label for="yourName">Your name</label>
            <input type="text" class="form-control" id="yourName" placeholder="Enter your name">
        </div>

        <div class="form-group">
            <label for="emailAddress">E-mail address</label>
            <input type="email" class="form-control" id="emailAddress" placehold="Enter your email">
        </div>

        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" cols="30" rows="10" class="form-control" placeholder="Enter your message">
        </div>
        <slot></slot>
        <button type="submit" class="btn btn-primary">Send</button>
    </form>
    </div>
</template>

<script>
</script>